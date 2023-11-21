import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    ActiveListItemsSection, ActiveListItemsContainer, ControlContainer, TotalItems, ButtonToArhiveList, ButtonLogOut, BtnContainer, ItemsContainer, ControlPanelContainer, Title, ItemContainer, ItemInfo, ItemStatistic, ItemBtn, ItemCircle, ItemLine
  } from './ActiveListItems.styled';
import { removeItem } from 'services/localStorService';
import { theme } from 'components/baseStyles/Variables.styled';
import { useEffect, useState } from 'react';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';

  export const ActiveListItems = () => {
    const [checklists, setChecklists] = useState([]);
    const [uniqueChecklists, setUniqueChecklists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      (async function getData() {
        setIsLoading(true);
        try {
          const { data } = await fetchData('*');
          if (!data) {
            return onFetchError('Whoops, something went wrong');
          }
          setChecklists(data.normal);
          const uniqueIdentifier = [];
          const uniqueChecklists = [];
          data.normal.forEach(element => {
            const isDuplicate = uniqueIdentifier.includes(element.identifier);
            if (!isDuplicate) {
              uniqueIdentifier.push(element.identifier);
            }
          });
          uniqueIdentifier.sort(function (a, b) {return b - a});
          uniqueIdentifier.map(it=> uniqueChecklists.push(data.normal.find(element=> element.identifier === it)));
          setUniqueChecklists(uniqueChecklists);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
          setTimeout(()=>getData(), 60000)
        }
      })();
    }, []);

    return (
      <ActiveListItemsSection>
        <ActiveListItemsContainer>
            <ControlContainer>
                <ControlPanelContainer>
                    <TotalItems>
                    <span style={{whiteSpace:"nowrap"}}>Текущих чек-листов:&nbsp;{uniqueChecklists?.length}</span>
                    </TotalItems>
                    <BtnContainer>
                        <Link style={{textDecoration:"none"}} to="/archive">
                            <ButtonToArhiveList type="button" aria-label="Перейти к списку архива чек-листов">Архив чек-листов</ButtonToArhiveList>
                        </Link>
                        <Link style={{textDecoration:"none"}} to="/">
                        <ButtonLogOut type="button" aria-label="Выход" onClick={()=>removeItem("authorization_id")}>Выход</ButtonLogOut>
                        </Link>
                    </BtnContainer>
                </ControlPanelContainer>
            </ControlContainer>
            <ItemsContainer>
                {isLoading ? onLoading() : onLoaded()}
                {error && onFetchError('Whoops, something went wrong')}
                {(checklists === undefined || checklists?.length === 0) && <Title>Ожидаем заполнения чек-листов</Title>}
                {uniqueChecklists && uniqueChecklists?.length > 0 && 
                uniqueChecklists.map((item)=>(item?.identifier !== undefined && item?.identifier !== '') && <ItemContainer key={item?.identifier} data-info={item?.identifier}>
                    <ItemInfo>
                      Чек-лист №{item?.identifier} от {moment(new Date(+item?.identifier)).format("DD/MM/YYYY")} Бригада №{item?.application_number} Время прибытия в больницу {item?.deliveryTimeHh} : {item?.deliveryTimeMm} Номер телефона: {item?.numberPhone}
                      <Link style={{textDecoration:"none"}} to={`/checklist/${item.identifier}`}>
                      <ItemBtn type="button" aria-label="Подробнее">Подробнее</ItemBtn>
                      </Link>
                    </ItemInfo>
                    <ItemStatistic>
                        <ItemCircle $props={(
                            (item?.patientFullName && item?.patientFullName !== "")  ||
                            (item?.patientINN && item?.patientINN !== '') ||
                            (item?.visualDescription && item?.visualDescription !== '') ||
                            (item?.saggingFace && item?.saggingFace !=="") ||
                            (item?.handDisplacement && item?.handDisplacement !=="") ||
                            (item?.speechDisorders && item?.speechDisorders !=="") ||
                            (item?.firstSymptomsTimeHh && item?.firstSymptomsTimeHh !=="") || 
                            (item?.firstSymptomsTimeMm && item?.firstSymptomsTimeMm !=="") ||
                            (item?.bloodSugarLevel && item?.bloodSugarLevel !=="") ||
                            (item?.bodyTemperature && item?.bodyTemperature !=="") ||
                            (item?.arterialPressureD && item?.arterialPressureD !=="") || 
                            (item?.arterialPressureS && item?.arterialPressureS !=="") ||
                            (item?.patientBodyWeight && item?.patientBodyWeight !=="") ||
                            (item?.patientAge && item?.patientAge !=="") ||
                            (item?.intracranialHemorrhages && item?.intracranialHemorrhages !=="") ||
                            (item?.majorSurgeriesOrSevereInjuries && item?.majorSurgeriesOrSevereInjuries !=="") ||
                            (item?.surgicalInterventions && item?.surgicalInterventions !=="") ||
                            (item?.myocardialInfarction && item?.myocardialInfarction !=="") ||
                            (item?.stroke && item?.stroke !=="") ||
                            (item?.arterialPuncture && item?.arterialPuncture !=="") ||
                            (item?.smallOperations && item?.smallOperations !=="") ||
                            (item?.cardiovascularDiseases && item?.cardiovascularDiseases !=="") ||
                            (item?.acuteInfectiousDisease && item?.acuteInfectiousDisease !=="") ||
                            (item?.hemorrhagicStroke && item?.hemorrhagicStroke !=="") ||
                            (item?.convulsions && item?.convulsions !=="") ||
                            (item?.hemorrhages && item?.hemorrhages !=="") ||
                            (item?.SACStroke && item?.SACStroke !=="") ||
                            (item?.ischemicStroke && item?.speechDisorders !=="")
                          ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $props={(
                            (item?.patientFullName && item?.patientFullName !== "")  ||
                            (item?.patientINN && item?.patientINN !== '') ||
                            (item?.visualDescription && item?.visualDescription !== '') ||
                            (item?.saggingFace && item?.saggingFace !=="") ||
                            (item?.handDisplacement && item?.handDisplacement !=="") ||
                            (item?.speechDisorders && item?.speechDisorders !=="") ||
                            (item?.firstSymptomsTimeHh && item?.firstSymptomsTimeHh !=="") || 
                            (item?.firstSymptomsTimeMm && item?.firstSymptomsTimeMm !=="") ||
                            (item?.bloodSugarLevel && item?.bloodSugarLevel !=="") ||
                            (item?.bodyTemperature && item?.bodyTemperature !=="") ||
                            (item?.arterialPressureD && item?.arterialPressureD !=="") || 
                            (item?.arterialPressureS && item?.arterialPressureS !=="") ||
                            (item?.patientBodyWeight && item?.patientBodyWeight !=="") ||
                            (item?.patientAge && item?.patientAge !=="") ||
                            (item?.intracranialHemorrhages && item?.intracranialHemorrhages !=="") ||
                            (item?.majorSurgeriesOrSevereInjuries && item?.majorSurgeriesOrSevereInjuries !=="") ||
                            (item?.surgicalInterventions && item?.surgicalInterventions !=="") ||
                            (item?.myocardialInfarction && item?.myocardialInfarction !=="") ||
                            (item?.stroke && item?.stroke !=="") ||
                            (item?.arterialPuncture && item?.arterialPuncture !=="") ||
                            (item?.smallOperations && item?.smallOperations !=="") ||
                            (item?.cardiovascularDiseases && item?.cardiovascularDiseases !=="") ||
                            (item?.acuteInfectiousDisease && item?.acuteInfectiousDisease !=="") ||
                            (item?.hemorrhagicStroke && item?.hemorrhagicStroke !=="") ||
                            (item?.convulsions && item?.convulsions !=="") ||
                            (item?.hemorrhages && item?.hemorrhages !=="") ||
                            (item?.SACStroke && item?.SACStroke !=="") ||
                            (item?.ischemicStroke && item?.speechDisorders !=="")
                        )  ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $props={(                                   (item?.saggingFace && item?.saggingFace !=="") ||
                            (item?.handDisplacement && item?.handDisplacement !=="")||
                            (item?.speechDisorders && item?.speechDisorders !=="")||
                            (item?.firstSymptomsTimeHh && item?.firstSymptomsTimeHh !=="") || 
                            (item?.firstSymptomsTimeMm && item?.firstSymptomsTimeMm !=="") ||
                            (item?.bloodSugarLevel && item?.bloodSugarLevel !=="") ||
                            (item?.bodyTemperature && item?.bodyTemperature !=="") ||
                            (item?.arterialPressureD && item?.arterialPressureD !=="") || 
                            (item?.arterialPressureS && item?.arterialPressureS !=="") ||
                            (item?.patientBodyWeight && item?.patientBodyWeight !=="") ||
                            (item?.patientAge && item?.patientAge !=="") ||
                            (item?.intracranialHemorrhages && item?.intracranialHemorrhages !=="") ||
                            (item?.majorSurgeriesOrSevereInjuries && item?.majorSurgeriesOrSevereInjuries !=="") ||
                            (item?.surgicalInterventions && item?.surgicalInterventions !=="") ||
                            (item?.myocardialInfarction && item?.myocardialInfarction !=="") ||
                            (item?.stroke && item?.stroke !=="") ||
                            (item?.arterialPuncture && item?.arterialPuncture !=="") ||
                            (item?.smallOperations && item?.smallOperations !=="") ||
                            (item?.cardiovascularDiseases && item?.cardiovascularDiseases !=="") ||
                            (item?.acuteInfectiousDisease && item?.acuteInfectiousDisease !=="") ||
                            (item?.hemorrhagicStroke && item?.hemorrhagicStroke !=="") ||
                            (item?.convulsions && item?.convulsions !=="") ||
                            (item?.hemorrhages && item?.hemorrhages !=="") ||
                            (item?.SACStroke && item?.SACStroke !=="") ||
                            (item?.ischemicStroke && item?.speechDisorders !=="")
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $props={(
                            (item?.saggingFace && item?.saggingFace !=="") ||
                            (item?.handDisplacement && item?.handDisplacement !=="")||
                            (item?.speechDisorders && item?.speechDisorders !=="")||
                            (item?.firstSymptomsTimeHh && item?.firstSymptomsTimeHh !=="") || 
                            (item?.firstSymptomsTimeMm && item?.firstSymptomsTimeMm !=="") ||
                            (item?.bloodSugarLevel && item?.bloodSugarLevel !=="") ||
                            (item?.bodyTemperature && item?.bodyTemperature !=="") ||
                            (item?.arterialPressureD && item?.arterialPressureD !=="") || 
                            (item?.arterialPressureS && item?.arterialPressureS !=="") ||
                            (item?.patientBodyWeight && item?.patientBodyWeight !=="") ||
                            (item?.patientAge && item?.patientAge !=="") ||
                            (item?.intracranialHemorrhages && item?.intracranialHemorrhages !=="") ||
                            (item?.majorSurgeriesOrSevereInjuries && item?.majorSurgeriesOrSevereInjuries !=="") ||
                            (item?.surgicalInterventions && item?.surgicalInterventions !=="") ||
                            (item?.myocardialInfarction && item?.myocardialInfarction !=="") ||
                            (item?.stroke && item?.stroke !=="") ||
                            (item?.arterialPuncture && item?.arterialPuncture !=="") ||
                            (item?.smallOperations && item?.smallOperations !=="") ||
                            (item?.cardiovascularDiseases && item?.cardiovascularDiseases !=="") ||
                            (item?.acuteInfectiousDisease && item?.acuteInfectiousDisease !=="") ||
                            (item?.hemorrhagicStroke && item?.hemorrhagicStroke !=="") ||
                            (item?.convulsions && item?.convulsions !=="") ||
                            (item?.hemorrhages && item?.hemorrhages !=="") ||
                            (item?.SACStroke && item?.SACStroke !=="") ||
                            (item?.ischemicStroke && item?.speechDisorders !=="")
                        ) ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $props={(
                          (item?.bloodSugarLevel && item?.bloodSugarLevel !=="") ||
                          (item?.bodyTemperature && item?.bodyTemperature !=="") ||
                          (item?.arterialPressureD && item?.arterialPressureD !=="") || 
                          (item?.arterialPressureS && item?.arterialPressureS !=="") ||
                          (item?.patientBodyWeight && item?.patientBodyWeight !=="") ||
                          (item?.patientAge && item?.patientAge !=="") ||
                          (item?.intracranialHemorrhages && item?.intracranialHemorrhages !=="") ||
                          (item?.majorSurgeriesOrSevereInjuries && item?.majorSurgeriesOrSevereInjuries !=="") ||
                          (item?.surgicalInterventions && item?.surgicalInterventions !=="") ||
                          (item?.myocardialInfarction && item?.myocardialInfarction !=="") ||
                          (item?.stroke && item?.stroke !=="") ||
                          (item?.arterialPuncture && item?.arterialPuncture !=="") ||
                          (item?.smallOperations && item?.smallOperations !=="") ||
                          (item?.cardiovascularDiseases && item?.cardiovascularDiseases !=="") ||
                          (item?.acuteInfectiousDisease && item?.acuteInfectiousDisease !=="") ||
                          (item?.hemorrhagicStroke && item?.hemorrhagicStroke !=="") ||
                          (item?.convulsions && item?.convulsions !=="") ||
                          (item?.hemorrhages && item?.hemorrhages !=="") ||
                          (item?.SACStroke && item?.SACStroke !=="") ||
                          (item?.ischemicStroke && item?.speechDisorders !=="")
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $props={(
                          (item?.bloodSugarLevel && item?.bloodSugarLevel !=="") ||
                          (item?.bodyTemperature && item?.bodyTemperature !=="") ||
                          (item?.arterialPressureD && item?.arterialPressureD !=="") || 
                          (item?.arterialPressureS && item?.arterialPressureS !=="") ||
                          (item?.patientBodyWeight && item?.patientBodyWeight !=="") ||
                          (item?.patientAge && item?.patientAge !=="") ||
                          (item?.intracranialHemorrhages && item?.intracranialHemorrhages !=="") ||
                          (item?.majorSurgeriesOrSevereInjuries && item?.majorSurgeriesOrSevereInjuries !=="") ||
                          (item?.surgicalInterventions && item?.surgicalInterventions !=="") ||
                          (item?.myocardialInfarction && item?.myocardialInfarction !=="") ||
                          (item?.stroke && item?.stroke !=="") ||
                          (item?.arterialPuncture && item?.arterialPuncture !=="") ||
                          (item?.smallOperations && item?.smallOperations !=="") ||
                          (item?.cardiovascularDiseases && item?.cardiovascularDiseases !=="") ||
                          (item?.acuteInfectiousDisease && item?.acuteInfectiousDisease !=="") ||
                          (item?.hemorrhagicStroke && item?.hemorrhagicStroke !=="") ||
                          (item?.convulsions && item?.convulsions !=="") ||
                          (item?.hemorrhages && item?.hemorrhages !=="") ||
                          (item?.SACStroke && item?.SACStroke !=="") ||
                          (item?.ischemicStroke && item?.speechDisorders !=="")
                        ) ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $props={(
                          (item?.intracranialHemorrhages && item?.intracranialHemorrhages !=="") ||
                          (item?.majorSurgeriesOrSevereInjuries && item?.majorSurgeriesOrSevereInjuries !=="") ||
                          (item?.surgicalInterventions && item?.surgicalInterventions !=="") ||
                          (item?.myocardialInfarction && item?.myocardialInfarction !=="") ||
                          (item?.stroke && item?.stroke !=="") ||
                          (item?.arterialPuncture && item?.arterialPuncture !=="") ||
                          (item?.smallOperations && item?.smallOperations !=="") ||
                          (item?.cardiovascularDiseases && item?.cardiovascularDiseases !=="") ||
                          (item?.acuteInfectiousDisease && item?.acuteInfectiousDisease !=="") ||
                          (item?.hemorrhagicStroke && item?.hemorrhagicStroke !=="") ||
                          (item?.convulsions && item?.convulsions !=="") ||
                          (item?.hemorrhages && item?.hemorrhages !=="") ||
                          (item?.SACStroke && item?.SACStroke !=="") ||
                          (item?.ischemicStroke && item?.speechDisorders !=="")
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                        <ItemLine $props={(
                           (item?.intracranialHemorrhages && item?.intracranialHemorrhages !=="") ||
                           (item?.majorSurgeriesOrSevereInjuries && item?.majorSurgeriesOrSevereInjuries !=="") ||
                           (item?.surgicalInterventions && item?.surgicalInterventions !=="") ||
                           (item?.myocardialInfarction && item?.myocardialInfarction !=="") ||
                           (item?.stroke && item?.stroke !=="") ||
                           (item?.arterialPuncture && item?.arterialPuncture !=="") ||
                           (item?.smallOperations && item?.smallOperations !=="") ||
                           (item?.cardiovascularDiseases && item?.cardiovascularDiseases !=="") ||
                           (item?.acuteInfectiousDisease && item?.acuteInfectiousDisease !=="") ||
                           (item?.hemorrhagicStroke && item?.hemorrhagicStroke !=="") ||
                           (item?.convulsions && item?.convulsions !=="") ||
                           (item?.hemorrhages && item?.hemorrhages !=="") ||
                           (item?.SACStroke && item?.SACStroke !=="") ||
                           (item?.ischemicStroke && item?.speechDisorders !=="")
                        ) ? theme.colors.linesBlue : theme.colors.darkGrey}></ItemLine>
                        <ItemCircle $props={(
                           (item?.smallOperations && item?.smallOperations !=="") ||
                           (item?.cardiovascularDiseases && item?.cardiovascularDiseases !=="") ||
                           (item?.acuteInfectiousDisease && item?.acuteInfectiousDisease !=="") ||
                           (item?.hemorrhagicStroke && item?.hemorrhagicStroke !=="") ||
                           (item?.convulsions && item?.convulsions !=="") ||
                           (item?.hemorrhages && item?.hemorrhages !=="") ||
                           (item?.SACStroke && item?.SACStroke !=="") ||
                           (item?.ischemicStroke && item?.speechDisorders !=="")
                        ) ? theme.colors.darkGreen : theme.colors.white}></ItemCircle>
                    </ItemStatistic>
                </ItemContainer>)}
            </ItemsContainer>
        </ActiveListItemsContainer>
      </ActiveListItemsSection>
    );
  };