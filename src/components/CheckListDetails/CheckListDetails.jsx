import { useEffect, useState } from 'react';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { Container } from 'components/baseStyles/CommonStyle.styled';
import {
  AdditionalInfoBox,
  AdditionalInfoBtn,
  AdditionalInfoBtnBox,
  AdditionalInfoDataBox,
  AdditionalInfoDataInput,
  AdditionalInfoDataInput2,
  AdditionalInfoDataLable,
  AdditionalInfoDataLable2,
  AdditionalInfoDataLableBox,
  AdditionalInfoForm,
  AdditionalInfoFormInput,
  AdditionalInfoFormLable,
  AdditionalInfoFormText,
  BackContainer,
  BackLink,
  CheckListBox,
  CheckListBtn,
  CheckListBtnBox,
  CheckListText,
  CheckListTextBack,
  CopyIcon,
  PatientBox,
  PatientBoxTitle,
  Table,
  Td,
  TdSmall,
  Tr,
  TrRed,
  Triangle,
  WordIcon,
} from './CheckListDetails.styled';
import clipboardCopy from 'clipboard-copy';
import { useParams } from 'react-router-dom';
import { theme } from 'components/baseStyles/Variables.styled';
import moment from 'moment';
import { export2Docx } from 'services/exportToWord';

export const CheckListDetails = () => {
  const [data, setData] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [inputDataNumberHospital, setInputDataNumberHospital] = useState('');
  const [inputDataHospitalizationTime, setInputDataHospitalizationTime] = useState('');
  const [inputDataHospitalizationDate, setInputDataHospitalizationDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const routerParams = useParams();
  const id = routerParams.id;
  const checkData = {
    bloodSugarLevelMin: 2.7,
    bloodSugarLevelMax: 22,
    bodyTemperatureMin: 35.9,
    bodyTemperatureMax: 37.3,
    arterialPressureS: 110,
    arterialPressureD: 180,
    patientAgeMin: 17,
    patientAgeMax: 80,
  };

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`read?identifier=${id}`); 
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setData(data.normal);
        if(data.normal?.numberHospital){setInputDataNumberHospital(data.normal?.numberHospital)};
        if(data.normal?.hospitalizationTime){setInputDataHospitalizationTime(data.normal?.hospitalizationTime)};
        if(data.normal?.hospitalizationDate){setInputDataHospitalizationDate(data.normal?.hospitalizationDate)};
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();

    const identifier = id;
    // const data_numberHospital = inputData.numberHospital;
    // const data_hospitalizationTime = inputData.hospitalizationTime;
    // const data_hospitalizationDate = inputData.hospitalizationDate;

    try {
      setIsLoading(true);
      const res = await fetchData(
        `edit?identifier=${identifier}&numberHospital=${inputDataNumberHospital}&hospitalizationTime=${inputDataHospitalizationTime}&hospitalizationDate=${inputDataHospitalizationDate}`
      );
      if (!res) {
        return onFetchError('Whoops, something went wrong');
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const patientData = `
    Чек-лист №${data?.identifier ? data?.identifier : ''}
    от ${data?.identifier ? moment(new Date(+data?.identifier)).format('DD/MM/YYYY') : ''}
    Бригада ${data?.application_number ? data?.application_number : ''}
    Предполагаемое время прибытия в больницу: ${data?.deliveryTimeHh? data?.deliveryTimeHh : ''}:${ data?.deliveryTimeMm ? data?.deliveryTimeMm : ''
    }
    Номер телефона: ${data?.numberPhone ? data?.numberPhone : ''}

    Личные данные пациента:
      ФИО пациента: ${data?.patientFullName ? data?.patientFullName : ''}
      ИИН пациента: ${data?.patientINN ? data?.patientINN : ''}
      Пол пациента: ${data?.patientSex ? data?.patientSex : ''}
      Визуальное описание: ${data?.visualDescription ? data?.visualDescription : ''}

    Методика F-A-S-T:
      Провисание на лице: ${
        data?.saggingFace && data?.saggingFace.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Смещение рук: ${
        data?.handDisplacement && data?.handDisplacement.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Нарушения речи: ${
        data?.speechDisorders && data?.speechDisorders.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Время появления первых симптомов: ${data?.firstSymptomsTimeHh}:${
      data?.firstSymptomsTimeMm
    } 

    Физиологические параметры:
      Содержание сахара в крови: ${data?.bloodSugarLevel ? data?.bloodSugarLevel : ''} ммоль/л
      Температура тела: ${data?.bodyTemperature ? data?.bodyTemperature: ''} °C
      Артериальное давление: ${data?.arterialPressureD ? data?.arterialPressureD : ''}/${
      data?.arterialPressureS ? data?.arterialPressureS : ''
    } мм. рт. ст.
      Масса тела пациента: ${data?.patientBodyWeight ? data?.patientBodyWeight : ''} кг
      Возраст пациента: ${data?.patientAge ? data?.patientAge : ''} лет

    Анамнез:
      Внутричерепные кровоизлияния: ${
        data?.intracranialHemorrhages &&
        data?.intracranialHemorrhages.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Большие операции или тяжелые травмы за последние 14 суток: ${
        data?.majorSurgeriesOrSevereInjuries &&
        data?.majorSurgeriesOrSevereInjuries.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Недавние внутричерепные или интраспинальные хирургические вмешательства: ${
        data?.surgicalInterventions &&
        data?.surgicalInterventions.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Инфаркт миокарда в предшествующие инсульту 3 месяца: ${
        data?.myocardialInfarction &&
        data?.myocardialInfarction.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Инсульт в предшествующие инсульту 3 месяца: ${
        data?.stroke && data?.stroke.toString() === 'true' ? 'Да' : '-'
      }
      Проведена пункция артерии в сложной для компрессии области в предшествующие инсульту 7 дней: ${
        data?.arterialPuncture && data?.arterialPuncture.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Малые операции или инвазивные вмешательства в последние 10 дней: ${
        data?.smallOperations && data?.smallOperations.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Сердечно-сосудистые заболевания (подострый бактериальный эндокардит, острый перикардит): ${
        data?.cardiovascularDiseases &&
        data?.cardiovascularDiseases.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Острое инфекционное заболевание: ${
        data?.acuteInfectiousDisease &&
        data?.acuteInfectiousDisease.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня до инсульта: ${
        data?.hemorrhagicStroke && data?.hemorrhagicStroke.toString() === 'true'
          ? 'Да'
          : '-'
      }
      Судорожные приступы в дебюте заболевания (имеется связь с острой церебральной ишемией): ${
        data?.convulsions && data?.convulsions.toString() === 'true'
          ? 'Да'
          : '-'
      }
      ОНМК ранее: ${
        (data?.hemorrhages && data?.hemorrhages.toString() === 'true') ||
        (data?.SACStroke && data?.SACStroke.toString() === 'true') ||
        (data?.ischemicStroke && data?.ischemicStroke.toString() === 'true')
          ? 'Да'
          : ''
      }
       Гемморагический: ${
         data?.hemorrhages && data?.hemorrhages.toString() === 'true'
           ? 'Да'
           : '-'
       }
       САК: ${
         data?.SACStroke && data?.SACStroke.toString() === 'true' ? 'Да' : '-'
       }
       Ишемический инсульт: ${
         data?.ischemicStroke && data?.ischemicStroke.toString() === 'true'
           ? 'Да'
           : '-'
       }

    Данные по заполнителю:
      ФИО сотрудника: ${data?.medicalStaffFullName ? data?.medicalStaffFullName : ''}
      № бригады СМП: №${data?.application_number ? data?.application_number : ''}
      Заполнение чек-листа начато: ${data?.startTimeAutoHh ? data?.startTimeAutoHh : ' '}:${
      data?.startTimeAutoMm ? data?.startTimeAutoMm : ' '
    } ${moment(new Date(+data?.identifier)).format('DD.MM.YYYY')}
      Заполнение чек-листа завершено:${data?.endTimeAutoHh ? data?.endTimeAutoHh : ' '}:${
      data?.endTimeAutoMm ? data?.endTimeAutoMm : ' '
    } ${moment(new Date(+data?.identifier)).format('DD.MM.YYYY')}

    Дополнительная информация от инсультного центра:
      Поликлиника прикрепления пациента: ${data?.numberHospital || ''}
      Дата и время госпитализации: ${data?.hospitalizationTime || ''}  ${
      data?.hospitalizationDate || ''
    }
  `;
    clipboardCopy(patientData);

    navigator.clipboard.writeText(patientData).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  return (
    <Container>
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError('Whoops, something went wrong')}
      <div id="exportContent">
        <CheckListBox>
          <div>
            <BackContainer>
              <BackLink to="#" onClick={() => window.history.back()}>
                <Triangle />
                <CheckListTextBack>Назад</CheckListTextBack>
              </BackLink>
            </BackContainer>
            {data?.time}
            <CheckListText>
              Чек-лист №{data?.identifier} <br />
              от {moment(new Date(+data?.identifier)).format('DD/MM/YYYY')}
              <br />
              Бригада №{data?.application_number}
              <br />
              <span style={{ marginRight: '10px' }}>
                Предполагаемое время прибытия в больницу
              </span>
              {data?.deliveryTimeHh}:{data?.deliveryTimeMm} <br />
              Номер телефона: {data?.numberPhone}
            </CheckListText>
          </div>

          <CheckListBtnBox>
            <CheckListBtn type="button" onClick={handleCopy}>
              <CopyIcon />
              {isCopied ? 'Скопировано!' : 'Скопировать данные'}
            </CheckListBtn>
            <CheckListBtn
              type="button"
              onClick={() =>
                export2Docx('exportContent', data?.patientFullName)
              }
            >
              <WordIcon /> Скачать в word
            </CheckListBtn>
          </CheckListBtnBox>
        </CheckListBox>

        <PatientBox>
          <PatientBoxTitle>Личные данные пациента</PatientBoxTitle>
          <Table>
            <tbody>
              <Tr>
                <Td>ФИО пациента</Td>
                <Td>{data?.patientFullName}</Td>
              </Tr>
              <Tr>
                <Td>ИИН пациента</Td>
                <Td>{data?.patientINN}</Td>
              </Tr>
              <Tr>
                <Td>Пол пациента</Td>
                <Td>{data?.patientSex}</Td>
              </Tr>
              <Tr>
                <Td>Визуальное описание - при отсутствии личных данных</Td>
                <Td>{data?.visualDescription}</Td>
              </Tr>
            </tbody>
          </Table>

          <PatientBoxTitle>Методика F-A-S-T</PatientBoxTitle>
          <Table>
            <tbody>
              <Tr>
                <Td>Провисание на лице</Td>
                <Td>
                  {data?.saggingFace && data?.saggingFace.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Смещение рук</Td>
                <Td>
                  {data?.handDisplacement &&
                  data?.handDisplacement.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Нарушения речи</Td>
                <Td>
                  {data?.speechDisorders &&
                  data?.speechDisorders.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td>Время появления первых симптомов</Td>
                <Td>
                  {data?.firstSymptomsTimeHh}:{data?.firstSymptomsTimeMm}
                </Td>
              </Tr>
            </tbody>
          </Table>

          <PatientBoxTitle>Физиологические параметры</PatientBoxTitle>
          <Table>
            <tbody>
              <TrRed
                $props={
                  Number(data?.bloodSugarLevel) <
                    checkData.bloodSugarLevelMin ||
                  Number(data?.bloodSugarLevel) > checkData.bloodSugarLevelMax
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <Td>Содержание сахара в крови</Td>
                <Td>{data?.bloodSugarLevel}</Td>
                <Td>ммоль/л</Td>
              </TrRed>
              <TrRed
                $props={
                  Number(data?.bodyTemperature) < checkData.bodyTemperatureMin || Number(data?.bodyTemperature) > checkData.bodyTemperatureMax
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <Td>Температура тела</Td>
                <Td>{data?.bodyTemperature}</Td>
                <Td>°C</Td>
              </TrRed>
              <TrRed
                $props={
                  Number(data?.arterialPressureS) >
                    checkData.arterialPressureS ||
                  Number(data?.arterialPressureD) > checkData.arterialPressureD
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <Td>Артериальное давление</Td>
                <Td>
                  {data?.arterialPressureS}<br/>{data?.arterialPressureD}
                </Td>
                <Td>мм. рт. ст.</Td>
              </TrRed>
              <Tr>
                <Td>Масса тела пациента</Td>
                <Td>{data?.patientBodyWeight}</Td>
                <Td>кг</Td>
              </Tr>
              <TrRed
                $props={
                  Number(data?.patientAge) < checkData.patientAgeMin ||
                  Number(data?.patientAge) > checkData.patientAgeMax
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <Td>Возраст пациента</Td>
                <Td>{data?.patientAge}</Td>
                <Td>лет</Td>
              </TrRed>
            </tbody>
          </Table>

          <PatientBoxTitle>Анамнез</PatientBoxTitle>
          <Table>
            <tbody>
              <TrRed
                $props={
                  data?.intracranialHemorrhages &&
                  data?.intracranialHemorrhages.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>Внутричерепные кровоизлияния</TdSmall>
                <TdSmall style={{ width: 194 }}>
                  {data?.intracranialHemorrhages &&
                  data?.intracranialHemorrhages.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.majorSurgeriesOrSevereInjuries &&
                  data?.majorSurgeriesOrSevereInjuries.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>
                  Большие операции или тяжелые травмы за последние 14 суток
                </TdSmall>
                <TdSmall>
                  {data?.majorSurgeriesOrSevereInjuries &&
                  data?.majorSurgeriesOrSevereInjuries.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.surgicalInterventions &&
                  data?.surgicalInterventions.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>
                  Недавние внутричерепные или интраспинальные хирургические
                  вмешательства
                </TdSmall>
                <TdSmall>
                  {data?.surgicalInterventions &&
                  data?.surgicalInterventions.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.myocardialInfarction &&
                  data?.myocardialInfarction.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>
                  Инфаркт миокарда в предшествующие инсульту 3 месяца
                </TdSmall>
                <TdSmall>
                  {data?.myocardialInfarction &&
                  data?.myocardialInfarction.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.stroke && data?.stroke.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>Инсульт в предшествующие инсульту 3 месяца</TdSmall>
                <TdSmall>
                  {data?.stroke && data?.stroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.arterialPuncture &&
                  data?.arterialPuncture.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>
                  Проведена пункция артерии в сложной для компрессии области в
                  предшествующие инсульту 7 дней.
                </TdSmall>
                <TdSmall>
                  {data?.arterialPuncture &&
                  data?.arterialPuncture.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.smallOperations &&
                  data?.smallOperations.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>
                  Малые операции или инвазивные вмешательства в последние 10
                  дней
                </TdSmall>
                <TdSmall>
                  {data?.smallOperations &&
                  data?.smallOperations.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.cardiovascularDiseases &&
                  data?.cardiovascularDiseases.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>
                  Сердечно-сосудистые заболевания (подострый бактериальный
                  эндокардит, острый перикардит)
                </TdSmall>
                <TdSmall>
                  {data?.cardiovascularDiseases &&
                  data?.cardiovascularDiseases.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.acuteInfectiousDisease &&
                  data?.acuteInfectiousDisease.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>Острое инфекционное заболевание</TdSmall>
                <TdSmall>
                  {data?.acuteInfectiousDisease &&
                  data?.acuteInfectiousDisease.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.hemorrhagicStroke &&
                  data?.hemorrhagicStroke.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>
                  Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня до
                  инсульта
                </TdSmall>
                <TdSmall>
                  {data?.hemorrhagicStroke &&
                  data?.hemorrhagicStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.convulsions && data?.convulsions.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>
                  Судорожные приступы в дебюте заболевания (имеется связь с
                  острой церебральной ишемией)
                </TdSmall>
                <TdSmall>
                  {data?.convulsions && data?.convulsions.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  (data?.hemorrhages &&
                    data?.hemorrhages.toString() === 'true') ||
                  (data?.SACStroke && data?.SACStroke.toString() === 'true') ||
                  (data?.ischemicStroke &&
                    data?.ischemicStroke.toString() === 'true')
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall>ОНМК ранее</TdSmall>
                <TdSmall>
                  {(data?.hemorrhages &&
                    data?.hemorrhages.toString() === 'true') ||
                  (data?.SACStroke && data?.SACStroke.toString() === 'true') ||
                  (data?.ischemicStroke &&
                    data?.ischemicStroke.toString() === 'true')
                    ? 'Да'
                    : ''}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.hemorrhages && data?.hemorrhages.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall style={{ paddingLeft: 60 }}>Гемморагический</TdSmall>
                <TdSmall>
                  {data?.hemorrhages && data?.hemorrhages.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.SACStroke && data?.SACStroke.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall style={{ paddingLeft: 60 }}>САК</TdSmall>
                <TdSmall>
                  {data?.SACStroke && data?.SACStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
              <TrRed
                $props={
                  data?.ischemicStroke &&
                  data?.ischemicStroke.toString() === 'true'
                    ? theme.colors.accentCoral
                    : theme.colors.darkGrey
                }
              >
                <TdSmall style={{ paddingLeft: 60 }}>
                  Ишемический инсульт
                </TdSmall>
                <TdSmall>
                  {data?.ischemicStroke &&
                  data?.ischemicStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmall>
              </TrRed>
            </tbody>
          </Table>

          <PatientBoxTitle>Данные по заполнителю</PatientBoxTitle>
          <Table style={{ marginBottom: 65 }}>
            <tbody>
              <Tr>
                <Td>ФИО сотрудника</Td>
                <Td>{data?.medicalStaffFullName}</Td>
              </Tr>
              <Tr>
                <Td>№ бригады СМП</Td>
                <Td>№{data?.application_number}</Td>
              </Tr>
              <Tr>
                <Td>Заполнение чек-листа начато</Td>
                <Td>
                  {(data?.startTimeAutoHh && data?.startTimeAutoHh.length < 2) ? "0" + data?.startTimeAutoHh : data?.startTimeAutoHh}:{(data?.startTimeAutoMm && data?.startTimeAutoMm.length < 2) ? "0" + data?.startTimeAutoMm : data?.startTimeAutoMm}{' '}
                  {moment(new Date(+data?.identifier)).format('DD.MM.YYYY')}
                </Td>
              </Tr>

              <Tr>
                <Td>Заполнение чек-листа завершено</Td>
                <Td>
                  {data?.endTimeAutoHh}:{data?.endTimeAutoMm}{' '}
                  {moment(new Date(+data?.identifier)).format('DD.MM.YYYY')}
                </Td>
              </Tr>
            </tbody>
          </Table>
        </PatientBox>

        <AdditionalInfoBox>
          <PatientBoxTitle>
            Дополнительная информация от инсультного центра
          </PatientBoxTitle>

          <AdditionalInfoForm>
            <AdditionalInfoFormLable>
              <AdditionalInfoFormText>
                Поликлиника прикрепления пациента
              </AdditionalInfoFormText>
              <AdditionalInfoFormInput
                type="text"
                value={inputDataNumberHospital}
                onChange={e =>
                  setInputDataNumberHospital(e.target.value)}
              />
            </AdditionalInfoFormLable>

            <AdditionalInfoDataBox>
              <AdditionalInfoFormText>
                Дата и время госпитализации
              </AdditionalInfoFormText>
              <AdditionalInfoDataLableBox>
                <AdditionalInfoDataLable>
                  <AdditionalInfoDataInput
                    type="time"
                    value={inputDataHospitalizationTime}
                    onChange={e =>setInputDataHospitalizationTime(e.target.value)}
                  />
                </AdditionalInfoDataLable>
                <AdditionalInfoDataLable2>
                  <AdditionalInfoDataInput2
                    type="date"
                    value={inputDataHospitalizationDate}
                    onChange={e =>setInputDataHospitalizationDate(e.target.value)}
                  />
                </AdditionalInfoDataLable2>
              </AdditionalInfoDataLableBox>
            </AdditionalInfoDataBox>

            <AdditionalInfoBtnBox>
              <AdditionalInfoBtn type="submit" onClick={handleSubmit}>
                Сохранить чек-лист
              </AdditionalInfoBtn>
            </AdditionalInfoBtnBox>
          </AdditionalInfoForm>
        </AdditionalInfoBox>
      </div>
    </Container>
  );
};
