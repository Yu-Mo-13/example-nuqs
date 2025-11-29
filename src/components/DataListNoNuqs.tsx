import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import data from '../data/m010_data_cleaned_final.json';
import '../assets/styles/DataListStyles.css'; // Import the shared styles

// Define the type for a single data item
interface DataItem {
  Region: string;
  IndustryClassification: string;
  BusinessActivity_Sales_MillionYen: string;
  EstablishmentCompany_Sales_MillionYen: string | null;
  EstablishmentCompany_TotalEmployees_People: string | null;
  EstablishmentCompany_Dispatchers_People: string | null;
  EstablishmentCompany_Recipients_People: string | null;
  EstablishmentCompany_Workers_People: string | null;
}

// Custom hook to manage state in URL query string
const useQueryStringState = (key: string, initialValue: string | number | null) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(() => {
    const params = new URLSearchParams(location.search);
    const paramValue = params.get(key);
    if (paramValue === null) {
      return initialValue;
    }
    if (typeof initialValue === 'number') {
      const num = Number(paramValue);
      return isNaN(num) ? initialValue : num;
    }
    return paramValue;
  });

  const updateUrl = useCallback(
    (newValue: string | number | null) => {
      const params = new URLSearchParams(location.search);
      if (newValue === null || newValue === '') {
        params.delete(key);
      } else {
        params.set(key, String(newValue));
      }
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    },
    [key, location.pathname, location.search, navigate]
  );

  const setStateValue = (newValue: string | number | null) => {
    setValue(newValue);
    updateUrl(newValue);
  };

  return [value, setStateValue] as const;
};


const DataListNoNuqs: React.FC = () => {
  const [region, setRegion] = useQueryStringState('region', '');
  const [industry, setIndustry] = useQueryStringState('industry', '');
  const [businessActivitySales, setBusinessActivitySales] = useQueryStringState('businessActivitySales', null);
  const [establishmentSales, setEstablishmentSales] = useQueryStringState('establishmentSales', null);
  const [totalEmployees, setTotalEmployees] = useQueryStringState('totalEmployees', null);
  const [dispatchers, setDispatchers] = useQueryStringState('dispatchers', null);
  const [recipients, setRecipients] = useQueryStringState('recipients', null);
  const [workers, setWorkers] = useQueryStringState('workers', null);


  const filteredData = data.filter((item: DataItem) => {
    const regionMatch = !region || item.Region.includes(region as string);
    const industryMatch = !industry || item.IndustryClassification.includes(industry as string);

    const businessActivitySalesMatch =
      businessActivitySales === null ||
      (item.BusinessActivity_Sales_MillionYen &&
        Number(item.BusinessActivity_Sales_MillionYen) >= (businessActivitySales as number));

    const establishmentSalesMatch =
    establishmentSales === null ||
      (item.EstablishmentCompany_Sales_MillionYen &&
        Number(item.EstablishmentCompany_Sales_MillionYen) >= (establishmentSales as number));

    const totalEmployeesMatch =
    totalEmployees === null ||
      (item.EstablishmentCompany_TotalEmployees_People &&
        Number(item.EstablishmentCompany_TotalEmployees_People) >= (totalEmployees as number));

    const dispatchersMatch =
    dispatchers === null ||
      (item.EstablishmentCompany_Dispatchers_People &&
        Number(item.EstablishmentCompany_Dispatchers_People) >= (dispatchers as number));

    const recipientsMatch =
    recipients === null ||
      (item.EstablishmentCompany_Recipients_People &&
        Number(item.EstablishmentCompany_Recipients_People) >= (recipients as number));

    const workersMatch =
    workers === null ||
      (item.EstablishmentCompany_Workers_People &&
        Number(item.EstablishmentCompany_Workers_People) >= (workers as number));

    return (
      regionMatch &&
      industryMatch &&
      businessActivitySalesMatch &&
      establishmentSalesMatch &&
      totalEmployeesMatch &&
      dispatchersMatch &&
      recipientsMatch &&
      workersMatch
    );
  });

  return (
    <div className="data-list-container">
      <h1>サービス産業動態統計調査 (No Nuqs)</h1>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Filter by Region"
          value={region || ''}
          onChange={(e) => setRegion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Industry"
          value={industry || ''}
          onChange={(e) => setIndustry(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Business Activity Sales"
          value={businessActivitySales ?? ''}
          onChange={(e) => setBusinessActivitySales(e.target.valueAsNumber || null)}
        />
        <input
          type="number"
          placeholder="Min Establishment Sales"
          value={establishmentSales ?? ''}
          onChange={(e) => setEstablishmentSales(e.target.valueAsNumber || null)}
        />
        <input
          type="number"
          placeholder="Min Total Employees"
          value={totalEmployees ?? ''}
          onChange={(e) => setTotalEmployees(e.target.valueAsNumber || null)}
        />
        <input
          type="number"
          placeholder="Min Dispatchers"
          value={dispatchers ?? ''}
          onChange={(e) => setDispatchers(e.target.valueAsNumber || null)}
        />
        <input
          type="number"
          placeholder="Min Recipients"
          value={recipients ?? ''}
          onChange={(e) => setRecipients(e.target.valueAsNumber || null)}
        />
        <input
          type="number"
          placeholder="Min Workers"
          value={workers ?? ''}
          onChange={(e) => setWorkers(e.target.valueAsNumber || null)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Industry Classification</th>
            <th>Business Activity Sales (Million Yen)</th>
            <th>Establishment Company Sales (Million Yen)</th>
            <th>Total Employees (People)</th>
            <th>Dispatchers (People)</th>
            <th>Recipients (People)</th>
            <th>Workers (People)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item: DataItem, index: number) => (
            <tr key={index}>
              <td>{item.Region}</td>
              <td>{item.IndustryClassification}</td>
              <td>
                {item.BusinessActivity_Sales_MillionYen
                  ? Number(item.BusinessActivity_Sales_MillionYen).toLocaleString()
                  : 'N/A'}
              </td>
              <td>
                {item.EstablishmentCompany_Sales_MillionYen
                  ? Number(item.EstablishmentCompany_Sales_MillionYen).toLocaleString()
                  : 'N/A'}
              </td>
              <td>
                {item.EstablishmentCompany_TotalEmployees_People
                  ? Number(item.EstablishmentCompany_TotalEmployees_People).toLocaleString()
                  : 'N/A'}
              </td>
              <td>
                {item.EstablishmentCompany_Dispatchers_People
                  ? Number(item.EstablishmentCompany_Dispatchers_People).toLocaleString()
                  : 'N/A'}
              </td>
              <td>
                {item.EstablishmentCompany_Recipients_People
                  ? Number(item.EstablishmentCompany_Recipients_People).toLocaleString()
                  : 'N/A'}
              </td>
              <td>
                {item.EstablishmentCompany_Workers_People
                  ? Number(item.EstablishmentCompany_Workers_People).toLocaleString()
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataListNoNuqs;
