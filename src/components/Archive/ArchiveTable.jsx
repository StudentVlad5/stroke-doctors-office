import React, { useState, useEffect } from 'react';
import { utils as XLSXUtils, writeFile as writeXLSX } from 'xlsx';
import moment from 'moment';
import { fetchData } from 'services/APIservice';
import { PaginationBlock } from 'helpers/Pagination/Pagination';
import {
  getFromStorage,
  // saveToStorage
} from 'services/localStorService';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import {
  BtnFilter,
  BtnWrapper,
  ClearFiltersBtn,
  DownloadExcel,
  Link,
  Table,
  TableData,
  TableFilter,
  TableHead,
  TableRow,
} from './ArchiveTable.styled';

import { ReactComponent as Close } from 'images/svg/close.svg';
import { ReactComponent as Excel } from 'images/svg/excel.svg';
import { FaFilter } from 'react-icons/fa';

const initialState = {
  filterChecklist: '',
  filterBrigadeSMP: '',
  filterPatientINN: '',
  filterPatientFIO: '',
  filterHospital: '',
  filterEmployeeID: '',
  filterStatusChecklist: '',
  filterDateStartChecklist: '',
  filterDurationOfHospitalization: '',
};

export const ArchiveTable = () => {
  const [checklists, setChecklists] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uniqueChecklists, setUniqueChecklists] = useState([]);
  const [filterChecklists, setFilterChecklists] = useState([]);
  const [filters, setFilters] = useState(initialState);
  // const [filters, setFilters] = useState(
  //   getFromStorage('filters') ? getFromStorage('filters') : initialState
  // );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  /* --- get archive checklists --- */
  // function getWeekNumber(date) {
  //   if (new Date(date).getDay() === 0) {
  //     const startOfYear = new Date(date.getFullYear(), 0, 1);
  //     const startOfWeek = new Date(
  //       startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay())
  //     );

  //     const diffInTime = date.getTime() - startOfWeek.getTime();
  //     const diffInWeeks = Math.floor(diffInTime / (1000 * 3600 * 24 * 7));

  //     return diffInWeeks;
  //   }

  //   const startOfYear = new Date(date.getFullYear(), 0, 1);
  //   const startOfWeek = new Date(
  //     startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay())
  //   );

  //   const diffInTime = date.getTime() - startOfWeek.getTime();
  //   const diffInWeeks = Math.floor(diffInTime / (1000 * 3600 * 24 * 7));

  //   return diffInWeeks + 1; // Add 1 to account for the first week
  // }

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData('*');
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }

        const sortedData = data.normal.sort(
          (a, b) => b.identifier - a.identifier
        );

        /* --- data filter this week --- */
        // const today = new Date();
        // const currentWeekNumber = getWeekNumber(today);
        // const archiveChecklists = sortedData.filter(
        //   ({ identifier }) =>
        //     currentWeekNumber === getWeekNumber(new Date(Number(identifier))) &&
        //     today.getDay() >= new Date(Number(identifier)).getDay()
        // );

        /* --- get unique identifier from archive checklists--- */
        const uniqueIdentifiers = [];
        // const unique = archiveChecklists.filter(element => {
        const unique = sortedData.filter(element => {
          const isDuplicate = uniqueIdentifiers.includes(element.identifier);
          if (!isDuplicate) {
            uniqueIdentifiers.push(element.identifier);
            return true;
          }
          return false;
        });

        setUniqueChecklists(uniqueIdentifiers);
        setChecklists(unique);
        setFilterChecklists(unique);

        // saveToStorage('filters', filters);
        // getActiveInput();
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        setReload(false);
      }
    })();
  }, [reload]);

  /* --- get selected filter elements after refresh--- */
  // const handleActiveInput = key => {
  //   const filtersFromLS = getFromStorage('filters');
  //   const selectedFilters = filtersFromLS[key];
  //   if (selectedFilters) {
  //     const inputs = document.querySelectorAll(`input[name="${key}"]`);
  //     inputs?.forEach(input => input.classList.add('active'));
  //   }
  // };

  // const getActiveInput = () => {
  //   Object.keys(initialState).forEach(filter => handleActiveInput(filter));
  // };

  const handleChangeFilter = e => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    const selectedFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(selectedFilters);
    // saveToStorage('filters', selectedFilters);
    document.querySelector(`button[id='${name}']`).classList.add('active');
  };

  const startFilterChecklists = e => {
    e.preventDefault();
    const peremOfFilter = [];
    // eslint-disable-next-line array-callback-return
    checklists.map(item => {
      if (
        item.identifier
          .toString()
          .toLowerCase()
          .includes(filters['filterChecklist']) &&
        item.application_number
          ?.split('/')
          .join('')
          .includes(filters['filterBrigadeSMP']) &&
        item.patientINN
          ?.split('')
          .join('')
          .includes(filters['filterPatientINN']) &&
        item.patientFullName
          ?.split('')
          .join('')
          .includes(filters['filterPatientFIO']) &&
        // &&
        // // item.numberHospital
        // //   ?.toString()
        // //   .toLowerCase()
        // //   .includes(filters['filterHospital'])
        item.employeeID
          ?.split('')
          .join('')
          .includes(filters['filterEmployeeID']) &&
        // &&
        // // item.checkStatus // при появлении параметров закоммитить
        // //   ?.toString()
        // //   .toLowerCase()
        // //   .includes(filters['filterStatusChecklist'])
        item.startTimeAutoHh
          ?.toString()
          .toLowerCase()
          .includes(filters['filterDateStartChecklist'])
        //&&
        // new Date(Number(item.identifier)) // при появлении параметров переделать на получаемый параметр
        //   .getMinutes()
        //   .toString()
        //   .toLowerCase()
        //   .includes(filters['filterDurationOfHospitalization'])
      ) {
        peremOfFilter.push(item);
      }
    });

    setFilterChecklists(peremOfFilter);
  };

  const handleClearAllFilters = e => {
    setFilters(initialState);
    const listOfInput = document.querySelectorAll('.active');
    listOfInput.forEach(item => item.classList.remove('active'));
    setReload(true);
  };

  const handleSearchOnEnter = e => {
    if (e.key === 'Enter') {
      startFilterChecklists(e);
    }
  };

  const toggleFilterItem = e => {
    e.stopPropagation();
    document
      .querySelector(`input[name='${e.currentTarget.id}']`)
      .classList.toggle('active');
  };

  // table pagination
  const [perPage] = useState(20);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(
    getFromStorage('page') ? getFromStorage('page') : 1
  );

  const handleDownloadExcel = () => {
    const dataForExcel = filterChecklists.map(checklist => ({
      'Чек-листа №': checklist.identifier,
      '№ Бригады СМП': checklist.application_number,
      'ИИН пациента': checklist.patientINN,
      'ФИО пациента': checklist.patientFullName,
      'Поликлиника прикрепления': checklist.numberHospital,
      'Идентификатор сотрудника': checklist.employeeID,
      'Статус чек-листа': checklist.checkStatus,
      'Дата Чек-листа': moment(new Date(+checklist?.identifier)).format(
        'DD.MM.YYYY'
      ),
      'Время начала чек-листа': `${checklist.startTimeAutoHh}:${checklist.startTimeAutoMm}`,
      ' Время от времени до госпитализации (от двери до иглы)': `${
        new Date(checklist?.identifier).getHours() -
        new Date(checklist?.identifier).getHours()
      } часов ${
        new Date(checklist?.identifier).getMinutes() -
        new Date(checklist?.identifier).getMinutes()
      } минут`,
    }));

    const ws = XLSXUtils.json_to_sheet(dataForExcel);
    const wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, 'Данные Чек-листов');
    writeXLSX(wb, 'Чек-листы.xlsx');
  };

  return (
    <>
      <BtnWrapper>
        <ClearFiltersBtn
          type="button"
          id="filters"
          name="clearFilters"
          aria-label="Сбросить фильтры"
          onClick={e => {
            handleClearAllFilters(e);
          }}
        >
          <Close /> <span>Сбросить фильтры</span>
        </ClearFiltersBtn>
        <DownloadExcel
          type="button"
          aria-label="Скачать в excel"
          onClick={handleDownloadExcel}
        >
          <Excel /> <span>Скачать в excel</span>
        </DownloadExcel>
      </BtnWrapper>
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError('Whoops, something went wrong')}
      <Table>
        <TableFilter>
          <TableRow>
            <TableHead>
              <span>Чек-лист</span>
              <input
                type="text"
                name="filterChecklist"
                placeholder=""
                value={filters['filterChecklist']}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterChecklist"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
              </BtnFilter>
            </TableHead>
            <TableHead>
              <span>
                № Бригады <br />
                СМП
              </span>
              <input
                type="text"
                name="filterBrigadeSMP"
                placeholder=""
                value={filters['filterBrigadeSMP']}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterBrigadeSMP"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
              </BtnFilter>
            </TableHead>
            <TableHead>
              <span>
                ИИН <br />
                пациента
              </span>
              <input
                type="text"
                name="filterPatientINN"
                placeholder=""
                value={filters['filterPatientINN']}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterPatientINN"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
              </BtnFilter>
            </TableHead>
            <TableHead>
              <span>
                ФИО <br />
                пациента
              </span>
              <input
                type="text"
                name="filterPatientFIO"
                placeholder=""
                value={filters['filterPatientFIO']}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterPatientFIO"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
              </BtnFilter>
            </TableHead>
            <TableHead>
              <span>
                Поликлиника <br />
                прикрепления
              </span>
              <input
                type="text"
                name="filterHospital"
                placeholder=""
                value={filters['filterHospital']}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterHospital"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
              </BtnFilter>
            </TableHead>
            <TableHead>
              <span>
                Идентификатор <br />
                сотрудника
              </span>
              <input
                type="text"
                name="filterEmployeeID"
                placeholder=""
                value={filters['filterEmployeeID']}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterEmployeeID"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
              </BtnFilter>
            </TableHead>
            <TableHead>
              <span>
                Статус <br />
                чек-листа
              </span>
              <input
                type="text"
                name="filterStatusChecklist"
                placeholder=""
                value={filters['filterStatusChecklist']}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterStatusChecklist"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
              </BtnFilter>
            </TableHead>
            <TableHead>
              <span>
                Дата и время начала <br />
                чек-листа
              </span>
              <input
                type="text"
                name="filterDateStartChecklist"
                placeholder=""
                value={filters['filterDateStartChecklist']}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterDateStartChecklist"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
              </BtnFilter>
            </TableHead>
            <TableHead>
              <span>
                Время от времени до <br />
                госпитализации <br />
                (от двери до иглы)
              </span>
              <input
                type="text"
                name="filterDurationOfHospitalization"
                placeholder=""
                value={filters['filterDurationOfHospitalization']}
                onKeyDown={e => handleSearchOnEnter(e)}
                onChange={e => handleChangeFilter(e)}
              />
              <BtnFilter
                type="button"
                id="filterDurationOfHospitalization"
                onClick={e => {
                  toggleFilterItem(e);
                }}
              >
                <FaFilter />
              </BtnFilter>
            </TableHead>
          </TableRow>
        </TableFilter>
        <tbody>
          {filterChecklists.length > 0 &&
            !error &&
            filterChecklists
              .slice((current - 1) * size, current * size)
              .map(item => (
                <TableRow key={item.identifier}>
                  <TableData>
                    <Link to={`/checklist/${item.identifier}`}>
                      № {item.identifier} от{' '}
                      {moment(new Date(+item?.identifier)).format('DD.MM.YYYY')}
                    </Link>
                  </TableData>
                  <TableData>№ {item.application_number}</TableData>
                  <TableData>{item.patientINN}</TableData>
                  <TableData>{item.patientFullName}</TableData>
                  <TableData>{item.numberHospital}</TableData>
                  <TableData>{item.employeeID}</TableData>
                  <TableData>{item.checkStatus}</TableData>
                  <TableData>
                    {moment(new Date(+item?.identifier)).format('DD.MM.YYYY')}
                    <br />
                    {item.startTimeAutoHh}:{item.startTimeAutoMm}
                  </TableData>
                  <TableData>
                    {new Date(item?.identifier).getHours() -
                      new Date(item?.identifier).getHours()}{' '}
                    часов{' '}
                    {new Date(item?.identifier).getMinutes() -
                      new Date(item?.identifier).getMinutes()}{' '}
                    минут
                  </TableData>
                </TableRow>
              ))}
        </tbody>
      </Table>
      {filterChecklists.length > 0 && !error && (
        <PaginationBlock
          items={filterChecklists}
          size={size}
          setSize={setSize}
          current={current}
          setCurrent={setCurrent}
        />
      )}
    </>
  );
};
