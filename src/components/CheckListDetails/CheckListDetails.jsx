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
  TdCheckCorrectItem,
  Tr,
  Triangle,
  WordIcon,
  CheckBoxItem,
  StylesCheckBoxItem,
  CheckIcon,
  TdRed,
  TdSmallRed,
  DecisionBox,
  DecisionBoxLabel,
  DecisionBoxInput,
  DecisionBoxTextarea,
  // DecisionBoxInputText,
  DecisionBoxTextareaLabel,
  TdCMP,
  TdCMPSpan,
} from './CheckListDetails.styled';
import clipboardCopy from 'clipboard-copy';
import { useParams } from 'react-router-dom';
import { theme } from 'components/baseStyles/Variables.styled';
import moment from 'moment';
import { export2Docx } from 'services/exportToWord';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export const CheckListDetails = () => {
  const [data, setData] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [inputDataNumberHospital, setInputDataNumberHospital] = useState('');
  const [inputDataHospitalizationTime, setInputDataHospitalizationTime] =
    useState('');
  const [inputDataHospitalizationDate, setInputDataHospitalizationDate] =
    useState('');
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
    firstSymptomsTimeMin: 270,
    firstSymptomsTimeMax: 4320,
  };

  // контролированный чекбокс по параметрам
  const [patientFullName_defect, setPatientFullName_defect] = useState(false);
  const [patientINN_defect, setPatientINN_defect] = useState(false);
  const [patientSex_defect, setPatientSex_defect] = useState(false);
  const [visualDescription_defect, setVisualDescription_defect] =
    useState(false);
  const [saggingFace_defect, setSaggingFace_defect] = useState(false);
  const [handDisplacement_defect, setHandDisplacement_defect] = useState(false);
  const [speechDisorders_defect, setSpeechDisorders_defect] = useState(false);
  const [firstSymptomsTime_defect, setFirstSymptomsTime_defect] =
    useState(false);
  const [bloodSugarLevel_defect, setBloodSugarLevel_defect] = useState(false);
  const [bodyTemperature_defect, setBodyTemperature_defect] = useState(false);
  const [arterialPressure_defect, setArterialPressure_defect] = useState(false);
  const [patientBodyWeight_defect, setPatientBodyWeight_defect] =
    useState(false);
  const [patientAge_defect, setPatientAge_defect] = useState(false);
  const [intracranialHemorrhages_defect, setIntracranialHemorrhages_defect] =
    useState(false);
  const [
    majorSurgeriesOrSevereInjuries_defect,
    setMajorSurgeriesOrSevereInjuries_defect,
  ] = useState(false);
  const [surgicalInterventions_defect, setSurgicalInterventions_defect] =
    useState(false);
  const [myocardialInfarction_defect, setMyocardialInfarction_defect] =
    useState(false);
  const [stroke_defect, setStroke_defect] = useState(false);
  const [arterialPuncture_defect, setArterialPuncture_defect] = useState(false);
  const [smallOperations_defect, setSmallOperations_defect] = useState(false);
  const [cardiovascularDiseases_defect, setCardiovascularDiseases_defect] =
    useState(false);
  const [acuteInfectiousDisease_defect, setAcuteInfectiousDisease_defect] =
    useState(false);
  const [hemorrhagicStroke_defect, setHemorrhagicStroke_defect] =
    useState(false);
  const [convulsions_defect, setConvulsions_defect] = useState(false);
  const [onmk_defect, setOnmk_defect] = useState(false);
  const [hemorrhages_defect, setHemorrhages_defect] = useState(false);
  const [SACStroke_defect, setSACStroke_defect] = useState(false);
  const [ischemicStroke_defect, setIschemicStroke_defect] = useState(false);
  const [beginStrokeTreatment_defect, setBeginStrokeTreatment_defect] =
    useState(false);
  const [intravenousAccess_defect, setIntravenousAccess_defect] =
    useState(false);
  const [
    patientTakingAnticoagulants_defect,
    setPatientTakingAnticoagulants_defect,
  ] = useState(false);
  const [ecgTaken_defect, setEcgTaken_defect] = useState(false);
  const [lossOfBalance_defect, setLossOfBalance_defect] = useState(false);
  const [visionProblems_defect, setVisionProblems_defect] = useState(false);
  const [, setNoteChecklistSMP_defect] = useState(false);//noteChecklistSMP_defect
  // Дополнительная информация от инсультного центра
  // const [patientArrivalTime, setPatientArrivalTime] = useState('');
  // const [patientArrivalDate, setPatientArrivalDate] = useState('');
  const [timeDateCt, setTimeDateCt] = useState('');
  // const [tltTimeDate, setTltTimeDate] = useState('');
  // Заключительное решение
  const [hospitalizationDepartment, setHospitalizationDepartment] =
    useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [
    noteChecklistStrokeCenter_defect,
    setNoteChecklistStrokeCenter_defect,
  ] = useState('');

  //  проверка для алерта время появления первых симптомов
  const [checkAlertSimptomDate, setCheckAlertSimptomDate] = useState(null);
  const [checkAlertSimptomHh, setCheckAlertSimptomHh] = useState(0);
  const [checkAlertSimptomMm, setCheckAlertSimptomMm] = useState(0);
  let checkDate = 0;
  if (checkAlertSimptomDate) {
    checkDate =
      (new Date() -
        new Date(
          `${checkAlertSimptomDate}  ${
            checkAlertSimptomHh.length < 2
              ? 0 + checkAlertSimptomHh
              : checkAlertSimptomHh
          }:${
            checkAlertSimptomMm.length < 2
              ? 0 + checkAlertSimptomMm
              : checkAlertSimptomMm
          }:00`
        )) /
      60000;
  }

  // ==================>

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`read?identifier=${id}`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setData(data.normal);
        if (data.normal?.numberHospital) {
          setInputDataNumberHospital(data.normal?.numberHospital);
        }
        if (data.normal?.hospitalizationTime) {
          setInputDataHospitalizationTime(data.normal?.hospitalizationTime);
        }
        if (data.normal?.hospitalizationDate) {
          setInputDataHospitalizationDate(data.normal?.hospitalizationDate);
        }
        if (data.normal?.patientFullName_defect) {
          setPatientFullName_defect(
            JSON.parse(data.normal?.patientFullName_defect)
          );
        }
        if (data.normal?.patientINN_defect) {
          setPatientINN_defect(JSON.parse(data.normal?.patientINN_defect));
        }
        if (data.normal?.patientSex_defect) {
          setPatientSex_defect(JSON.parse(data.normal?.patientSex_defect));
        }
        if (data.normal?.visualDescription_defect) {
          setVisualDescription_defect(
            JSON.parse(data.normal?.visualDescription_defect)
          );
        }
        if (data.normal?.saggingFace_defect) {
          setSaggingFace_defect(JSON.parse(data.normal?.saggingFace_defect));
        }
        if (data.normal?.handDisplacement_defect) {
          setHandDisplacement_defect(
            JSON.parse(data.normal?.handDisplacement_defect)
          );
        }
        if (data.normal?.speechDisorders_defect) {
          setSpeechDisorders_defect(
            JSON.parse(data.normal?.speechDisorders_defect)
          );
        }
        if (data.normal?.firstSymptomsTime_defect) {
          setFirstSymptomsTime_defect(
            JSON.parse(data.normal?.firstSymptomsTime_defect)
          );
        }
        if (data.normal?.bloodSugarLevel_defect) {
          setBloodSugarLevel_defect(
            JSON.parse(data.normal?.bloodSugarLevel_defect)
          );
        }
        if (data.normal?.bodyTemperature_defect) {
          setBodyTemperature_defect(
            JSON.parse(data.normal?.bodyTemperature_defect)
          );
        }
        if (data.normal?.arterialPressure_defect) {
          setArterialPressure_defect(
            JSON.parse(data.normal?.arterialPressure_defect)
          );
        }
        if (data.normal?.patientBodyWeight_defect) {
          setPatientBodyWeight_defect(
            JSON.parse(data.normal?.patientBodyWeight_defect)
          );
        }
        if (data.normal?.patientAge_defect) {
          setPatientAge_defect(JSON.parse(data.normal?.patientAge_defect));
        }
        if (data.normal?.intracranialHemorrhages_defect) {
          setIntracranialHemorrhages_defect(
            JSON.parse(data.normal?.intracranialHemorrhages_defect)
          );
        }
        if (data.normal?.majorSurgeriesOrSevereInjuries_defect) {
          setMajorSurgeriesOrSevereInjuries_defect(
            JSON.parse(data.normal?.majorSurgeriesOrSevereInjuries_defect)
          );
        }
        if (data.normal?.surgicalInterventions_defect) {
          setSurgicalInterventions_defect(
            JSON.parse(data.normal?.surgicalInterventions_defect)
          );
        }
        if (data.normal?.myocardialInfarction_defect) {
          setMyocardialInfarction_defect(
            JSON.parse(data.normal?.myocardialInfarction_defect)
          );
        }
        if (data.normal?.stroke_defect) {
          setStroke_defect(JSON.parse(data.normal?.stroke_defect));
        }
        if (data.normal?.arterialPuncture_defect) {
          setArterialPuncture_defect(
            JSON.parse(data.normal?.arterialPuncture_defect)
          );
        }
        if (data.normal?.smallOperations_defect) {
          setSmallOperations_defect(
            JSON.parse(data.normal?.smallOperations_defect)
          );
        }
        if (data.normal?.cardiovascularDiseases_defect) {
          setCardiovascularDiseases_defect(
            JSON.parse(data.normal?.cardiovascularDiseases_defect)
          );
        }
        if (data.normal?.acuteInfectiousDisease_defect) {
          setAcuteInfectiousDisease_defect(
            JSON.parse(data.normal?.acuteInfectiousDisease_defect)
          );
        }
        if (data.normal?.hemorrhagicStroke_defect) {
          setHemorrhagicStroke_defect(
            JSON.parse(data.normal?.hemorrhagicStroke_defect)
          );
        }
        if (data.normal?.convulsions_defect) {
          setConvulsions_defect(JSON.parse(data.normal?.convulsions_defect));
        }
        if (data.normal?.onmk_defect) {
          setOnmk_defect(JSON.parse(data.normal?.onmk_defect));
        }
        if (data.normal?.hemorrhages_defect) {
          setHemorrhages_defect(JSON.parse(data.normal?.hemorrhages_defect));
        }
        if (data.normal?.SACStroke_defect) {
          setSACStroke_defect(JSON.parse(data.normal?.SACStroke_defect));
        }
        if (data.normal?.ischemicStroke_defect) {
          setIschemicStroke_defect(
            JSON.parse(data.normal?.ischemicStroke_defect)
          );
        }
        if (data.normal?.beginStrokeTreatment_defect) {
          setBeginStrokeTreatment_defect(
            JSON.parse(data.normal?.beginStrokeTreatment_defect)
          );
        }
        if (data.normal?.intravenousAccess_defect) {
          setIntravenousAccess_defect(
            JSON.parse(data.normal?.intravenousAccess_defect)
          );
        }
        if (data.normal?.patientTakingAnticoagulants_defect) {
          setPatientTakingAnticoagulants_defect(
            JSON.parse(data.normal?.patientTakingAnticoagulants_defect)
          );
        }
        if (data.normal?.ecgTaken_defect) {
          setEcgTaken_defect(JSON.parse(data.normal?.ecgTaken_defect));
        }
        if (data.normal?.lossOfBalance_defect) {
          setLossOfBalance_defect(
            JSON.parse(data.normal?.lossOfBalance_defect)
          );
        }
        if (data.normal?.visionProblems_defect) {
          setVisionProblems_defect(
            JSON.parse(data.normal?.visionProblems_defect)
          );
        }
        if (data.normal?.firstSymptomsTimeHh) {
          setCheckAlertSimptomHh(data.normal?.firstSymptomsTimeHh);
        }
        if (data.normal?.firstSymptomsTimeMm) {
          setCheckAlertSimptomMm(data.normal?.firstSymptomsTimeMm);
        }
        if (data.normal?.firstSymptomsDate) {
          setCheckAlertSimptomDate(data.normal?.firstSymptomsDate);
        }
        if (data.normal?.selectedOption) {
          setSelectedOption(data.normal?.selectedOption);
        }
        if (data.normal?.hospitalizationDepartment) {
          setHospitalizationDepartment(data.normal?.hospitalizationDepartment);
        }
        if (data.normal?.noteChecklistStrokeCenter_defect) {
          setNoteChecklistStrokeCenter_defect(
            data.normal?.noteChecklistStrokeCenter_defect
          );
        }
        if (data.normal?.noteChecklistSMP_defect) {
          setNoteChecklistSMP_defect(
            JSON.parse(data.normal?.noteChecklistSMP_defect)
          );
        }
        if (data.normal?.timeDateCt) {
          setTimeDateCt(moment(data.normal?.timeDateCt));
        }
        // if (data.normal?.hospitalizationDepartment) {
        //   setHospitalizationDepartment(hospitalizationDepartment);
        // }
        // if (data.normal?.hospitalizationDepartment) {
        //   setHospitalizationDepartment(hospitalizationDepartment);
        // }
        // if (data.normal?.hospitalizationDepartment) {
        //   setHospitalizationDepartment(hospitalizationDepartment);
        // }
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
        `edit?identifier=${identifier}&numberHospital=${inputDataNumberHospital}
        &hospitalizationTime=${inputDataHospitalizationTime}&hospitalizationDate=${inputDataHospitalizationDate}&patientFullName_defect=${patientFullName_defect}&patientINN_defect=${patientINN_defect}&patientSex_defect=${patientSex_defect}
        &visualDescription_defect=${visualDescription_defect}&saggingFace_defect=${saggingFace_defect}&handDisplacement_defect=${handDisplacement_defect}&speechDisorders_defect=${speechDisorders_defect}&firstSymptomsTime_defect=${firstSymptomsTime_defect}&bloodSugarLevel_defect=${bloodSugarLevel_defect}&bodyTemperature_defect=${bodyTemperature_defect}&arterialPressure_defect=${arterialPressure_defect}&patientBodyWeight_defect=${patientBodyWeight_defect}&patientAge_defect=${patientAge_defect}&intracranialHemorrhages_defect=${intracranialHemorrhages_defect}&majorSurgeriesOrSevereInjuries_defect=${majorSurgeriesOrSevereInjuries_defect}&surgicalInterventions_defect=${surgicalInterventions_defect}&myocardialInfarction_defect=${myocardialInfarction_defect}&stroke_defect=${stroke_defect}
        &arterialPuncture_defect=${arterialPuncture_defect}&smallOperations_defect=${smallOperations_defect}&cardiovascularDiseases_defect=${cardiovascularDiseases_defect}&acuteInfectiousDisease_defect=${acuteInfectiousDisease_defect}&hemorrhagicStroke_defect=${hemorrhagicStroke_defect}&convulsions_defect=${convulsions_defect}&onmk_defect=${onmk_defect}
        &hemorrhages_defect=${hemorrhages_defect}&SACStroke_defect=${SACStroke_defect}&ischemicStroke_defect=${ischemicStroke_defect}&beginStrokeTreatment_defect=${beginStrokeTreatment_defect}&intravenousAccess_defect=${intravenousAccess_defect}&patientTakingAnticoagulants_defect=${patientTakingAnticoagulants_defect}&ecgTaken_defect=${ecgTaken_defect}&lossOfBalance_defect=${lossOfBalance_defect}&visionProblems_defect=${visionProblems_defect}&selectedOption=${selectedOption}&hospitalizationDepartment=${hospitalizationDepartment}
        &noteChecklistStrokeCenter_defect=${noteChecklistStrokeCenter_defect}&timeDateCt=${timeDateCt}`
        // &timeDateCt=${timeDateCt}
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
    от ${
      data?.identifier
        ? moment(new Date(+data?.identifier)).format('DD/MM/YYYY')
        : ''
    }
    Бригада ${data?.application_number ? data?.application_number : ''}
    Предполагаемое время прибытия в больницу: ${
      data?.deliveryTimeHh ? data?.deliveryTimeHh : ''
    }:${data?.deliveryTimeMm ? data?.deliveryTimeMm : ''}
    Номер телефона: ${data?.numberPhone ? data?.numberPhone : ''}

    Личные данные пациента:
      ФИО пациента: ${data?.patientFullName ? data?.patientFullName : ''}
      ИИН пациента: ${data?.patientINN ? data?.patientINN : ''}
      Пол пациента: ${data?.patientSex ? data?.patientSex : ''}
      Визуальное описание: ${
        data?.visualDescription ? data?.visualDescription : ''
      }

    Методика BE FAST:
      Потеря равновесия:  ${
        data?.lossOfBalance && data?.lossOfBalance.toString() === 'true'
          ? 'Да'
          : 'Нет'
      }
      Проблемы со зрением, двоение в глазах:${
        data?.visionProblems && data?.visionProblems.toString() === 'true'
          ? 'Да'
          : 'Нет'
      }
      Провисание на лице: ${
        data?.saggingFace && data?.saggingFace.toString() === 'true'
          ? 'Да'
          : 'Нет'
      }
      Смещение рук: ${
        data?.handDisplacement && data?.handDisplacement.toString() === 'true'
          ? 'Да'
          : 'Нет'
      }
      Нарушения речи: ${
        data?.speechDisorders && data?.speechDisorders.toString() === 'true'
          ? 'Да'
          : 'Нет'
      }
      Время появления первых симптомов: ${data?.firstSymptomsTimeHh}:${
      data?.firstSymptomsTimeMm
    } 

    Действия при подозрении на инсульт: 
      Начата процедура лечения инсульта: ${
        data?.beginStrokeTreatment &&
        data?.beginStrokeTreatment.toString() === 'true'
          ? 'Да'
          : 'Нет'
      }
      Установлен внутривенный доступ: ${
        data?.intravenousAccess && data?.intravenousAccess.toString() === 'true'
          ? 'Да'
          : 'Нет'
      }
      Пациент принимает антикоагулянты: ${
        data?.patientTakingAnticoagulants &&
        data?.patientTakingAnticoagulants.toString() === 'true'
          ? 'Да'
          : 'Нет'
      }
      У пациента снято ЭКГ: ${data?.ecgTakenHH ? data?.ecgTakenHH : ''} : ${
      data?.ecgTakenMM ? data?.ecgTakenMM : ''
    } 
      
    Физиологические параметры:
      Содержание сахара в крови: ${
        data?.bloodSugarLevel ? data?.bloodSugarLevel : ''
      } ммоль/л
      Температура тела: ${data?.bodyTemperature ? data?.bodyTemperature : ''} °C
      Артериальное давление: ${
        data?.arterialPressureS ? data?.arterialPressureS : ''
      }/${data?.arterialPressureD ? data?.arterialPressureD : ''} мм. рт. ст.
      Масса тела пациента: ${
        data?.patientBodyWeight ? data?.patientBodyWeight : ''
      } кг
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
      ФИО сотрудника: ${
        data?.medicalStaffFullName ? data?.medicalStaffFullName : ''
      }
      № бригады СМП: №${
        data?.application_number ? data?.application_number : ''
      }
      Заполнение чек-листа начато: ${
        data?.startTimeAutoHh ? data?.startTimeAutoHh : ' '
      }:${data?.startTimeAutoMm ? data?.startTimeAutoMm : ' '} ${moment(
      new Date(+data?.identifier)
    ).format('DD.MM.YYYY')}
      Заполнение чек-листа завершено:${
        data?.endTimeAutoHh ? data?.endTimeAutoHh : ' '
      }:${data?.endTimeAutoMm ? data?.endTimeAutoMm : ' '} ${moment(
      new Date(+data?.identifier)
    ).format('DD.MM.YYYY')}
    Примечание к чек-листу от СМП: ${data?.noteChecklistSMP || ''}

    Дополнительная информация от инсультного центра:
      Поликлиника прикрепления пациента: ${data?.numberHospital || ''}
      Дата и время прибытия пациента: 
      Дата и время проведения КТ:
      Дата и время проведения ТЛТ:
      Дата и время госпитализации: ${data?.hospitalizationTime || ''}  ${
      data?.hospitalizationDate || ''
    }

      Заключительное решение:
       Госпитализация в Инсультный центр: ${
         data?.selectedOption === 'hospitalizationStrokeCenter' ? 'Да' : 'Нет'
       }
       Направление на амбулаторное лечение: ${
         data?.selectedOption === 'outpatientTreatment' ? 'Да' : 'Нет'
       }
       Госпитализация в другое отделение: ${
         data?.hospitalizationDepartment || ''
       }
       Примечание к чек-листу от Инсультного центра:  ${
         data?.noteChecklistStrokeCenter_defect || ''
       }
       

  `;
    clipboardCopy(patientData);

    navigator.clipboard.writeText(patientData).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  console.log(timeDateCt);
  
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
              <Tr className="rowTable">
                <Td>ФИО пациента</Td>
                <Td>{data?.patientFullName}</Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="patientFullName_defect"
                      name="patientFullName_defect"
                      value={patientFullName_defect}
                      onChange={() =>
                        setPatientFullName_defect(!patientFullName_defect)
                      }
                      checked={patientFullName_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={patientFullName_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={patientFullName_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>ИИН пациента</Td>
                <Td>{data?.patientINN}</Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="patientINN_defect"
                      name="patientINN_defect"
                      value={patientINN_defect}
                      onChange={() => setPatientINN_defect(!patientINN_defect)}
                      checked={patientINN_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={patientINN_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={patientINN_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>Пол пациента</Td>
                <Td>{data?.patientSex}</Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="patientSex_defect"
                      name="patientSex_defect"
                      value={patientSex_defect}
                      onChange={() => setPatientSex_defect(!patientSex_defect)}
                      checked={patientSex_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={patientSex_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={patientSex_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>Визуальное описание - при отсутствии личных данных</Td>
                <Td>{data?.visualDescription}</Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="visualDescription_defect"
                      name="visualDescription_defect"
                      value={visualDescription_defect}
                      onChange={() =>
                        setVisualDescription_defect(!visualDescription_defect)
                      }
                      checked={visualDescription_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={visualDescription_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={visualDescription_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
            </tbody>
          </Table>

          <PatientBoxTitle>Методика BE FAST</PatientBoxTitle>
          <Table>
            <tbody>
              <Tr>
                <Td>Потеря равновесия</Td>
                <Td>
                  {data?.lossOfBalance &&
                  data?.lossOfBalance.toString() === 'true'
                    ? 'Да'
                    : 'Нет'}
                </Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="lossOfBalance_defect"
                      name="lossOfBalance_defect"
                      value={lossOfBalance_defect}
                      onChange={() =>
                        setLossOfBalance_defect(!lossOfBalance_defect)
                      }
                      checked={lossOfBalance_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={lossOfBalance_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={lossOfBalance_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>Проблемы со зрением, двоение в глазах</Td>
                <Td>
                  {data?.visionProblems &&
                  data?.visionProblems.toString() === 'true'
                    ? 'Да'
                    : 'Нет'}
                </Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="visionProblems_defect"
                      name="visionProblems_defect"
                      value={visionProblems_defect}
                      onChange={() =>
                        setVisionProblems_defect(!visionProblems_defect)
                      }
                      checked={visionProblems_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={visionProblems_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={visionProblems_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>Провисание на лице</Td>
                <Td>
                  {data?.saggingFace && data?.saggingFace.toString() === 'true'
                    ? 'Да'
                    : 'Нет'}
                </Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="saggingFace_defect"
                      name="saggingFace_defect"
                      value={saggingFace_defect}
                      onChange={() =>
                        setSaggingFace_defect(!saggingFace_defect)
                      }
                      checked={saggingFace_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={saggingFace_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={saggingFace_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>Смещение рук</Td>
                <Td>
                  {data?.handDisplacement &&
                  data?.handDisplacement.toString() === 'true'
                    ? 'Да'
                    : 'Нет'}
                </Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="handDisplacement_defect"
                      name="handDisplacement_defect"
                      value={handDisplacement_defect}
                      onChange={() =>
                        setHandDisplacement_defect(!handDisplacement_defect)
                      }
                      checked={handDisplacement_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={handDisplacement_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={handDisplacement_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>Нарушения речи</Td>
                <Td>
                  {data?.speechDisorders &&
                  data?.speechDisorders.toString() === 'true'
                    ? 'Да'
                    : 'Нет'}
                </Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="speechDisorders_defect"
                      name="speechDisorders_defect"
                      value={speechDisorders_defect}
                      onChange={() =>
                        setSpeechDisorders_defect(!speechDisorders_defect)
                      }
                      checked={speechDisorders_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={speechDisorders_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={speechDisorders_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdRed
                  $props={
                    checkDate > checkData.firstSymptomsTimeMin &&
                    checkDate < checkData.firstSymptomsTimeMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Время появления первых симптомов
                </TdRed>
                <TdRed
                  $props={
                    checkDate > checkData.firstSymptomsTimeMin &&
                    checkDate < checkData.firstSymptomsTimeMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.firstSymptomsTimeHh
                    ? `${data?.firstSymptomsTimeHh}:${data?.firstSymptomsTimeMm}`
                    : 'Нет данных'}
                  {' / '}
                  {data?.firstSymptomsDate
                    ? data?.firstSymptomsDate
                    : 'Нет данных'}
                </TdRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="firstSymptomsTime_defect"
                      name="firstSymptomsTime_defect"
                      value={firstSymptomsTime_defect}
                      onChange={() =>
                        setFirstSymptomsTime_defect(!firstSymptomsTime_defect)
                      }
                      checked={firstSymptomsTime_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={firstSymptomsTime_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={firstSymptomsTime_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
            </tbody>
          </Table>

          <PatientBoxTitle>Действия при подозрении на инсульт</PatientBoxTitle>
          <Table>
            <tbody>
              <Tr>
                <Td>Начата процедура лечения инсульта</Td>
                <Td>
                  {data?.beginStrokeTreatment &&
                  data?.beginStrokeTreatment.toString() === 'true'
                    ? 'Да'
                    : 'Нет'}
                </Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="beginStrokeTreatment_defect"
                      name="beginStrokeTreatment_defect"
                      value={beginStrokeTreatment_defect}
                      onChange={() =>
                        setBeginStrokeTreatment_defect(
                          !beginStrokeTreatment_defect
                        )
                      }
                      checked={beginStrokeTreatment_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={beginStrokeTreatment_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={beginStrokeTreatment_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>Установлен внутривенный доступ</Td>
                <Td>
                  {data?.intravenousAccess &&
                  data?.intravenousAccess.toString() === 'true'
                    ? 'Да'
                    : 'Нет'}
                </Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="intravenousAccess_defect"
                      name="intravenousAccess_defect"
                      value={intravenousAccess_defect}
                      onChange={() =>
                        setIntravenousAccess_defect(!intravenousAccess_defect)
                      }
                      checked={intravenousAccess_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={intravenousAccess_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={intravenousAccess_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>Пациент принимает антикоагулянты</Td>
                <Td>
                  {data?.patientTakingAnticoagulants &&
                  data?.patientTakingAnticoagulants.toString() === 'true'
                    ? 'Да'
                    : 'Нет'}
                </Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="patientTakingAnticoagulants_defect"
                      name="patientTakingAnticoagulants_defect"
                      value={patientTakingAnticoagulants_defect}
                      onChange={() =>
                        setPatientTakingAnticoagulants_defect(
                          !patientTakingAnticoagulants_defect
                        )
                      }
                      checked={patientTakingAnticoagulants_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={
                        patientTakingAnticoagulants_defect ? '4px' : '1px'
                      }
                    >
                      <CheckIcon
                        $props={
                          patientTakingAnticoagulants_defect ? '1' : '0.5'
                        }
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>У пациента снято ЭКГ</Td>
                <Td>
                  {data?.ecgTakenHH}:{data?.ecgTakenMM}
                </Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="ecgTaken_defect"
                      name="ecgTaken_defect"
                      value={ecgTaken_defect}
                      onChange={() => setEcgTaken_defect(!ecgTaken_defect)}
                      checked={ecgTaken_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={ecgTaken_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={ecgTaken_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
            </tbody>
          </Table>

          <PatientBoxTitle>Физиологические параметры</PatientBoxTitle>
          <Table>
            <tbody>
              <Tr>
                <TdRed
                  $props={
                    Number(data?.bloodSugarLevel) <
                      checkData.bloodSugarLevelMin ||
                    Number(data?.bloodSugarLevel) > checkData.bloodSugarLevelMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Содержание сахара в крови
                </TdRed>
                <TdRed
                  $props={
                    Number(data?.bloodSugarLevel) <
                      checkData.bloodSugarLevelMin ||
                    Number(data?.bloodSugarLevel) > checkData.bloodSugarLevelMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.bloodSugarLevel}
                </TdRed>
                <TdRed
                  $props={
                    Number(data?.bloodSugarLevel) <
                      checkData.bloodSugarLevelMin ||
                    Number(data?.bloodSugarLevel) > checkData.bloodSugarLevelMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  ммоль/л
                </TdRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="bloodSugarLevel_defect"
                      name="bloodSugarLevel_defect"
                      value={bloodSugarLevel_defect}
                      onChange={() =>
                        setBloodSugarLevel_defect(!bloodSugarLevel_defect)
                      }
                      checked={bloodSugarLevel_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={bloodSugarLevel_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={bloodSugarLevel_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdRed
                  $props={
                    Number(data?.bodyTemperature) <
                      checkData.bodyTemperatureMin ||
                    Number(data?.bodyTemperature) > checkData.bodyTemperatureMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Температура тела
                </TdRed>
                <TdRed
                  $props={
                    Number(data?.bodyTemperature) <
                      checkData.bodyTemperatureMin ||
                    Number(data?.bodyTemperature) > checkData.bodyTemperatureMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.bodyTemperature}
                </TdRed>
                <TdRed
                  $props={
                    Number(data?.bodyTemperature) <
                      checkData.bodyTemperatureMin ||
                    Number(data?.bodyTemperature) > checkData.bodyTemperatureMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  °C
                </TdRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="bodyTemperature_defect"
                      name="bodyTemperature_defect"
                      value={bodyTemperature_defect}
                      onChange={() =>
                        setBodyTemperature_defect(!bodyTemperature_defect)
                      }
                      checked={bodyTemperature_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={bodyTemperature_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={bodyTemperature_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdRed
                  $props={
                    Number(data?.arterialPressureS) >
                      checkData.arterialPressureS ||
                    Number(data?.arterialPressureD) >
                      checkData.arterialPressureD
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Артериальное давление
                </TdRed>
                <TdRed
                  $props={
                    Number(data?.arterialPressureS) >
                      checkData.arterialPressureS ||
                    Number(data?.arterialPressureD) >
                      checkData.arterialPressureD
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.arterialPressureS}/{data?.arterialPressureD}
                </TdRed>
                <TdRed
                  $props={
                    Number(data?.arterialPressureS) >
                      checkData.arterialPressureS ||
                    Number(data?.arterialPressureD) >
                      checkData.arterialPressureD
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  мм. рт. ст.
                </TdRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="arterialPressure_defect"
                      name="arterialPressure_defect"
                      value={arterialPressure_defect}
                      onChange={() =>
                        setArterialPressure_defect(!arterialPressure_defect)
                      }
                      checked={arterialPressure_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={arterialPressure_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={arterialPressure_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <Td>Масса тела пациента</Td>
                <Td>{data?.patientBodyWeight}</Td>
                <Td>кг</Td>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="patientBodyWeight_defect"
                      name="patientBodyWeight_defect"
                      value={patientBodyWeight_defect}
                      onChange={() =>
                        setPatientBodyWeight_defect(!patientBodyWeight_defect)
                      }
                      checked={patientBodyWeight_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={patientBodyWeight_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={patientBodyWeight_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdRed
                  $props={
                    Number(data?.patientAge) < checkData.patientAgeMin ||
                    Number(data?.patientAge) > checkData.patientAgeMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Возраст пациента
                </TdRed>
                <TdRed
                  $props={
                    Number(data?.patientAge) < checkData.patientAgeMin ||
                    Number(data?.patientAge) > checkData.patientAgeMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.patientAge}
                </TdRed>
                <TdRed
                  $props={
                    Number(data?.patientAge) < checkData.patientAgeMin ||
                    Number(data?.patientAge) > checkData.patientAgeMax
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  лет
                </TdRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="patientAge_defect"
                      name="patientAge_defect"
                      value={patientAge_defect}
                      onChange={() => setPatientAge_defect(!patientAge_defect)}
                      checked={patientAge_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={patientAge_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={patientAge_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
            </tbody>
          </Table>

          <PatientBoxTitle>Анамнез</PatientBoxTitle>
          <Table>
            <tbody>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.intracranialHemorrhages &&
                    data?.intracranialHemorrhages.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Внутричерепные кровоизлияния
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.intracranialHemorrhages &&
                    data?.intracranialHemorrhages.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                  style={{ width: 194 }}
                >
                  {data?.intracranialHemorrhages &&
                  data?.intracranialHemorrhages.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="intracranialHemorrhages_defect"
                      name="intracranialHemorrhages_defect"
                      value={intracranialHemorrhages_defect}
                      onChange={() =>
                        setIntracranialHemorrhages_defect(
                          !intracranialHemorrhages_defect
                        )
                      }
                      checked={intracranialHemorrhages_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={intracranialHemorrhages_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={intracranialHemorrhages_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.majorSurgeriesOrSevereInjuries &&
                    data?.majorSurgeriesOrSevereInjuries.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Большие операции или тяжелые травмы за последние 14 суток
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.majorSurgeriesOrSevereInjuries &&
                    data?.majorSurgeriesOrSevereInjuries.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.majorSurgeriesOrSevereInjuries &&
                  data?.majorSurgeriesOrSevereInjuries.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="majorSurgeriesOrSevereInjuries_defect"
                      name="majorSurgeriesOrSevereInjuries_defect"
                      value={majorSurgeriesOrSevereInjuries_defect}
                      onChange={() =>
                        setMajorSurgeriesOrSevereInjuries_defect(
                          !majorSurgeriesOrSevereInjuries_defect
                        )
                      }
                      checked={majorSurgeriesOrSevereInjuries_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={
                        majorSurgeriesOrSevereInjuries_defect ? '4px' : '1px'
                      }
                    >
                      <CheckIcon
                        $props={
                          majorSurgeriesOrSevereInjuries_defect ? '1' : '0.5'
                        }
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.surgicalInterventions &&
                    data?.surgicalInterventions.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Недавние внутричерепные или интраспинальные хирургические
                  вмешательства
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.surgicalInterventions &&
                    data?.surgicalInterventions.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.surgicalInterventions &&
                  data?.surgicalInterventions.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="surgicalInterventions_defect"
                      name="surgicalInterventions_defect"
                      value={surgicalInterventions_defect}
                      onChange={() =>
                        setSurgicalInterventions_defect(
                          !surgicalInterventions_defect
                        )
                      }
                      checked={surgicalInterventions_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={surgicalInterventions_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={surgicalInterventions_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.myocardialInfarction &&
                    data?.myocardialInfarction.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Инфаркт миокарда в предшествующие инсульту 3 месяца
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.myocardialInfarction &&
                    data?.myocardialInfarction.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.myocardialInfarction &&
                  data?.myocardialInfarction.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="myocardialInfarction_defect"
                      name="myocardialInfarction_defect"
                      value={myocardialInfarction_defect}
                      onChange={() =>
                        setMyocardialInfarction_defect(
                          !myocardialInfarction_defect
                        )
                      }
                      checked={myocardialInfarction_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={myocardialInfarction_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={myocardialInfarction_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.stroke && data?.stroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Инсульт в предшествующие инсульту 3 месяца
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.stroke && data?.stroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.stroke && data?.stroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="stroke_defect"
                      name="stroke_defect"
                      value={stroke_defect}
                      onChange={() => setStroke_defect(!stroke_defect)}
                      checked={stroke_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem $props={stroke_defect ? '4px' : '1px'}>
                      <CheckIcon $props={stroke_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.arterialPuncture &&
                    data?.arterialPuncture.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Проведена пункция артерии в сложной для компрессии области в
                  предшествующие инсульту 7 дней.
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.arterialPuncture &&
                    data?.arterialPuncture.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.arterialPuncture &&
                  data?.arterialPuncture.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="arterialPuncture_defect"
                      name="arterialPuncture_defect"
                      value={arterialPuncture_defect}
                      onChange={() =>
                        setArterialPuncture_defect(!arterialPuncture_defect)
                      }
                      checked={arterialPuncture_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={arterialPuncture_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={arterialPuncture_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.smallOperations &&
                    data?.smallOperations.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Малые операции или инвазивные вмешательства в последние 10
                  дней
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.smallOperations &&
                    data?.smallOperations.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.smallOperations &&
                  data?.smallOperations.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="smallOperations_defect"
                      name="smallOperations_defect"
                      value={smallOperations_defect}
                      onChange={() =>
                        setSmallOperations_defect(!smallOperations_defect)
                      }
                      checked={smallOperations_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={smallOperations_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={smallOperations_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.cardiovascularDiseases &&
                    data?.cardiovascularDiseases.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Сердечно-сосудистые заболевания (подострый бактериальный
                  эндокардит, острый перикардит)
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.cardiovascularDiseases &&
                    data?.cardiovascularDiseases.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.cardiovascularDiseases &&
                  data?.cardiovascularDiseases.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="cardiovascularDiseases_defect"
                      name="cardiovascularDiseases_defect"
                      value={cardiovascularDiseases_defect}
                      onChange={() =>
                        setCardiovascularDiseases_defect(
                          !cardiovascularDiseases_defect
                        )
                      }
                      checked={cardiovascularDiseases_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={cardiovascularDiseases_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={cardiovascularDiseases_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.acuteInfectiousDisease &&
                    data?.acuteInfectiousDisease.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Острое инфекционное заболевание
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.acuteInfectiousDisease &&
                    data?.acuteInfectiousDisease.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.acuteInfectiousDisease &&
                  data?.acuteInfectiousDisease.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="acuteInfectiousDisease_defect"
                      name="acuteInfectiousDisease_defect"
                      value={acuteInfectiousDisease_defect}
                      onChange={() =>
                        setAcuteInfectiousDisease_defect(
                          !acuteInfectiousDisease_defect
                        )
                      }
                      checked={acuteInfectiousDisease_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={acuteInfectiousDisease_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={acuteInfectiousDisease_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.hemorrhagicStroke &&
                    data?.hemorrhagicStroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня до
                  инсульта
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.hemorrhagicStroke &&
                    data?.hemorrhagicStroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.hemorrhagicStroke &&
                  data?.hemorrhagicStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="hemorrhagicStroke_defect"
                      name="acuteInfectiousDisease_defect"
                      value={hemorrhagicStroke_defect}
                      onChange={() =>
                        setHemorrhagicStroke_defect(!hemorrhagicStroke_defect)
                      }
                      checked={hemorrhagicStroke_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={hemorrhagicStroke_defect ? '4px' : '1px'}
                    >
                      <CheckIcon
                        $props={hemorrhagicStroke_defect ? '1' : '0.5'}
                      />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.convulsions && data?.convulsions.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  Судорожные приступы в дебюте заболевания (имеется связь с
                  острой церебральной ишемией)
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.convulsions && data?.convulsions.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.convulsions && data?.convulsions.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="convulsions_defect"
                      name="acuteInfectiousDisease_defect"
                      value={convulsions_defect}
                      onChange={() =>
                        setConvulsions_defect(!convulsions_defect)
                      }
                      checked={convulsions_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={convulsions_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={convulsions_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    (data?.hemorrhages &&
                      data?.hemorrhages.toString() === 'true') ||
                    (data?.SACStroke &&
                      data?.SACStroke.toString() === 'true') ||
                    (data?.ischemicStroke &&
                      data?.ischemicStroke.toString() === 'true')
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  ОНМК ранее
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    (data?.hemorrhages &&
                      data?.hemorrhages.toString() === 'true') ||
                    (data?.SACStroke &&
                      data?.SACStroke.toString() === 'true') ||
                    (data?.ischemicStroke &&
                      data?.ischemicStroke.toString() === 'true')
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {(data?.hemorrhages &&
                    data?.hemorrhages.toString() === 'true') ||
                  (data?.SACStroke && data?.SACStroke.toString() === 'true') ||
                  (data?.ischemicStroke &&
                    data?.ischemicStroke.toString() === 'true')
                    ? 'Да'
                    : ''}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="onmk_defect"
                      name="onmk_defect"
                      value={onmk_defect}
                      onChange={() => setOnmk_defect(!onmk_defect)}
                      checked={onmk_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem $props={onmk_defect ? '4px' : '1px'}>
                      <CheckIcon $props={onmk_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.hemorrhages && data?.hemorrhages.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                  style={{ paddingLeft: 60 }}
                >
                  Гемморагический
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.hemorrhages && data?.hemorrhages.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.hemorrhages && data?.hemorrhages.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="hemorrhages_defect"
                      name="hemorrhages_defect"
                      value={hemorrhages_defect}
                      onChange={() =>
                        setHemorrhages_defect(!hemorrhages_defect)
                      }
                      checked={hemorrhages_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={hemorrhages_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={hemorrhages_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.SACStroke && data?.SACStroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                  style={{ paddingLeft: 60 }}
                >
                  САК
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.SACStroke && data?.SACStroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.SACStroke && data?.SACStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="SACStroke_defect"
                      name="SACStroke_defect"
                      value={SACStroke_defect}
                      onChange={() => setSACStroke_defect(!SACStroke_defect)}
                      checked={SACStroke_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={SACStroke_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={SACStroke_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
              <Tr>
                <TdSmallRed
                  $props={
                    data?.ischemicStroke &&
                    data?.ischemicStroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                  style={{ paddingLeft: 60 }}
                >
                  Ишемический инсульт
                </TdSmallRed>
                <TdSmallRed
                  $props={
                    data?.ischemicStroke &&
                    data?.ischemicStroke.toString() === 'true'
                      ? theme.colors.accentCoral
                      : theme.colors.darkGrey
                  }
                >
                  {data?.ischemicStroke &&
                  data?.ischemicStroke.toString() === 'true'
                    ? 'Да'
                    : '-'}
                </TdSmallRed>
                <TdCheckCorrectItem>
                  <label>
                    <CheckBoxItem
                      type="checkbox"
                      id="ischemicStroke_defect"
                      name="ischemicStroke_defect"
                      value={ischemicStroke_defect}
                      onChange={() =>
                        setIschemicStroke_defect(!ischemicStroke_defect)
                      }
                      checked={ischemicStroke_defect}
                    ></CheckBoxItem>
                    <StylesCheckBoxItem
                      $props={ischemicStroke_defect ? '4px' : '1px'}
                    >
                      <CheckIcon $props={ischemicStroke_defect ? '1' : '0.5'} />
                    </StylesCheckBoxItem>
                  </label>
                </TdCheckCorrectItem>
              </Tr>
            </tbody>
          </Table>

          <PatientBoxTitle>Данные по заполнителю</PatientBoxTitle>
          <Table style={{ marginBottom: 65 }}>
            <tbody>
              <Tr>
                <Td>ФИО сотрудника</Td>
                <Td>
                  {data?.medicalStaffFullName ? data?.medicalStaffFullName : ''}
                </Td>
              </Tr>
              <Tr>
                <Td>№ бригады СМП</Td>
                <Td>
                  №{data?.application_number ? data?.application_number : ''}
                </Td>
              </Tr>
              <Tr>
                <Td>Заполнение чек-листа начато</Td>
                <Td>
                  {data?.startTimeAutoHh && data?.startTimeAutoHh.length < 2
                    ? '0' + data?.startTimeAutoHh
                    : data?.startTimeAutoHh}
                  {data?.startTimeAutoHh && data?.startTimeAutoMm ? ':' : '-'}
                  {data?.startTimeAutoMm && data?.startTimeAutoMm.length < 2
                    ? '0' + data?.startTimeAutoMm
                    : data?.startTimeAutoMm}{' '}
                  {moment(new Date(+data?.identifier)).format('DD.MM.YYYY')}
                </Td>
              </Tr>

              <Tr>
                <Td>Заполнение чек-листа завершено</Td>
                <Td>
                  {data?.endTimeAutoHh && data?.endTimeAutoHh.length < 2
                    ? '0' + data?.endTimeAutoHh
                    : data?.endTimeAutoHh}
                  {data?.endTimeAutoHh && data?.endTimeAutoMm ? ':' : '-'}
                  {data?.endTimeAutoMm && data?.endTimeAutoMm.length < 2
                    ? '0' + data?.endTimeAutoMm
                    : data?.endTimeAutoMm}{' '}
                  {moment(new Date(+data?.identifier)).format('DD.MM.YYYY')}
                </Td>
              </Tr>

              <Tr>
                <TdCMP colSpan="2">
                  <TdCMPSpan>Примечание к чек-листу от СМП:</TdCMPSpan>

                  <br />
                  <br />
                  <TdCMPSpan>{data?.noteChecklistSMP_defect}</TdCMPSpan>
                </TdCMP>
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
                onChange={e => setInputDataNumberHospital(e.target.value)}
              />
            </AdditionalInfoFormLable>

            <AdditionalInfoDataBox>
              <AdditionalInfoFormText>
                Дата и время прибытия пациента
              </AdditionalInfoFormText>
              <AdditionalInfoDataLableBox>
                <AdditionalInfoDataLable>
                  <AdditionalInfoDataInput
                    type="time"
                    // value={inputDataHospitalizationTime}
                    // onChange={e =>
                    //   setInputDataHospitalizationTime(e.target.value)
                    // }
                  />
                </AdditionalInfoDataLable>
                <AdditionalInfoDataLable2>
                  <AdditionalInfoDataInput2
                    type="date"
                    // value={inputDataHospitalizationDate}
                    // onChange={e =>
                    //   setInputDataHospitalizationDate(e.target.value)
                    // }
                  />
                </AdditionalInfoDataLable2>
              </AdditionalInfoDataLableBox>
            </AdditionalInfoDataBox>

            <AdditionalInfoDataBox>
              <AdditionalInfoFormText>
                Дата и время проведения КТ
              </AdditionalInfoFormText>
              <AdditionalInfoDataLableBox>
                <AdditionalInfoDataLable>
                  {/* <AdditionalInfoDataInput
                    type="time"
                    // value={inputDataHospitalizationTime}
                    // onChange={e =>
                    //   setInputDataHospitalizationTime(e.target.value)
                    // }
                  /> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DateTimePicker
                        label="Введите время и дату"
                        ampm={false}
                        format="YYYY-MM-DD HH:mm"
                        value={timeDateCt}
                        onChange={e => setTimeDateCt(e.target.value)}
                        // value={selectedDateTime}
                        // onChange={handleDateTimeChange}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </AdditionalInfoDataLable>
              </AdditionalInfoDataLableBox>
            </AdditionalInfoDataBox>

            <AdditionalInfoDataBox>
              <AdditionalInfoFormText>
                Дата и время проведения ТЛТ
              </AdditionalInfoFormText>
              <AdditionalInfoDataLableBox>
                <AdditionalInfoDataLable>
                  <AdditionalInfoDataInput type="time" />
                </AdditionalInfoDataLable>
                <AdditionalInfoDataLable2>
                  <AdditionalInfoDataInput2 type="date" />
                </AdditionalInfoDataLable2>
              </AdditionalInfoDataLableBox>
            </AdditionalInfoDataBox>

            <AdditionalInfoDataBox>
              <AdditionalInfoFormText>
                Дата и время госпитализации
              </AdditionalInfoFormText>
              <AdditionalInfoDataLableBox>
                <AdditionalInfoDataLable>
                  <AdditionalInfoDataInput
                    type="time"
                    value={inputDataHospitalizationTime}
                    onChange={e =>
                      setInputDataHospitalizationTime(e.target.value)
                    }
                  />
                </AdditionalInfoDataLable>
                <AdditionalInfoDataLable2>
                  <AdditionalInfoDataInput2
                    type="date"
                    value={inputDataHospitalizationDate}
                    onChange={e =>
                      setInputDataHospitalizationDate(e.target.value)
                    }
                  />
                </AdditionalInfoDataLable2>
              </AdditionalInfoDataLableBox>
            </AdditionalInfoDataBox>

            <DecisionBox>
              <PatientBoxTitle>Заключительное решение</PatientBoxTitle>
              <DecisionBoxLabel>
                <AdditionalInfoFormText>
                  Госпитализация в Инсультный центр
                </AdditionalInfoFormText>
                <DecisionBoxInput
                  type="radio"
                  value="hospitalizationStrokeCenter"
                  checked={selectedOption === 'hospitalizationStrokeCenter'}
                  onChange={e => setSelectedOption(e.target.value)}
                />
              </DecisionBoxLabel>

              <DecisionBoxLabel>
                <AdditionalInfoFormText>
                  Направление на амбулаторное лечение
                </AdditionalInfoFormText>
                <DecisionBoxInput
                  type="radio"
                  value="outpatientTreatment"
                  checked={selectedOption === 'outpatientTreatment'}
                  onChange={e => setSelectedOption(e.target.value)}
                />
              </DecisionBoxLabel>

              <DecisionBoxLabel>
                <AdditionalInfoFormText>
                  Госпитализация в другое отделение
                </AdditionalInfoFormText>
                <AdditionalInfoFormInput
                  type="text"
                  name="hospitalizationDepartment"
                  value={hospitalizationDepartment}
                  onChange={e => setHospitalizationDepartment(e.target.value)}
                />
              </DecisionBoxLabel>

              <DecisionBoxTextareaLabel>
                <AdditionalInfoFormText style={{ marginBottom: 12 }}>
                  Примечание к чек-листу от Инсультного центра
                </AdditionalInfoFormText>

                <DecisionBoxTextarea
                  name="noteChecklistStrokeCenter_defect"
                  value={noteChecklistStrokeCenter_defect}
                  onChange={e =>
                    setNoteChecklistStrokeCenter_defect(e.target.value)
                  }
                ></DecisionBoxTextarea>
              </DecisionBoxTextareaLabel>
            </DecisionBox>

            <AdditionalInfoBtnBox>
              <AdditionalInfoBtn
                type="submit"
                onClick={handleSubmit}
                // onClick={handleConfirmClick}
              >
                Сохранить чек-лист
              </AdditionalInfoBtn>
            </AdditionalInfoBtnBox>
          </AdditionalInfoForm>
        </AdditionalInfoBox>
      </div>
    </Container>
  );
};
