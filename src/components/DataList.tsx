import React from 'react';
import { useQueryStates, parseAsInteger, parseAsString } from 'nuqs';
import data from '../data/m010_data_cleaned_final.json';

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

const DataList: React.FC = () => {
  const [filters, setFilters] = useQueryStates({
    region: parseAsString.withDefault(''),
    industry: parseAsString.withDefault(''),
    businessActivitySales: parseAsInteger,
    establishmentSales: parseAsInteger,
    totalEmployees: parseAsInteger,
    dispatchers: parseAsInteger,
    recipients: parseAsInteger,
    workers: parseAsInteger,
  });

  const filteredData = data.filter((item: DataItem) => {
    const regionMatch = !filters.region || item.Region === filters.region;
    const industryMatch = !filters.industry || item.IndustryClassification === filters.industry;

    const businessActivitySalesMatch =
      !filters.businessActivitySales ||
      (item.BusinessActivity_Sales_MillionYen &&
        Number(item.BusinessActivity_Sales_MillionYen) >= filters.businessActivitySales);

    const establishmentSalesMatch =
      !filters.establishmentSales ||
      (item.EstablishmentCompany_Sales_MillionYen &&
        Number(item.EstablishmentCompany_Sales_MillionYen) >= filters.establishmentSales);

    const totalEmployeesMatch =
      !filters.totalEmployees ||
      (item.EstablishmentCompany_TotalEmployees_People &&
        Number(item.EstablishmentCompany_TotalEmployees_People) >= filters.totalEmployees);

    const dispatchersMatch =
      !filters.dispatchers ||
      (item.EstablishmentCompany_Dispatchers_People &&
        Number(item.EstablishmentCompany_Dispatchers_People) >= filters.dispatchers);

    const recipientsMatch =
      !filters.recipients ||
      (item.EstablishmentCompany_Recipients_People &&
        Number(item.EstablishmentCompany_Recipients_People) >= filters.recipients);

    const workersMatch =
      !filters.workers ||
      (item.EstablishmentCompany_Workers_People &&
        Number(item.EstablishmentCompany_Workers_People) >= filters.workers);

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
      <h1>サービス産業動態統計調査</h1>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Filter by Region"
          value={filters.region}
          onChange={(e) => setFilters({ region: e.target.value || null })}
        />
        <input
          type="text"
          placeholder="Filter by Industry"
          value={filters.industry}
          onChange={(e) => setFilters({ industry: e.target.value || null })}
        />
        <input
          type="number"
          placeholder="Min Business Activity Sales"
          value={filters.businessActivitySales ?? ''}
          onChange={(e) => setFilters({ businessActivitySales: e.target.valueAsNumber || null })}
        />
        <input
          type="number"
          placeholder="Min Establishment Sales"
          value={filters.establishmentSales ?? ''}
          onChange={(e) => setFilters({ establishmentSales: e.target.valueAsNumber || null })}
        />
        <input
          type="number"
          placeholder="Min Total Employees"
          value={filters.totalEmployees ?? ''}
          onChange={(e) => setFilters({ totalEmployees: e.target.valueAsNumber || null })}
        />
        <input
          type="number"
          placeholder="Min Dispatchers"
          value={filters.dispatchers ?? ''}
          onChange={(e) => setFilters({ dispatchers: e.target.valueAsNumber || null })}
        />
        <input
          type="number"
          placeholder="Min Recipients"
          value={filters.recipients ?? ''}
          onChange={(e) => setFilters({ recipients: e.target.valueAsNumber || null })}
        />
        <input
          type="number"
          placeholder="Min Workers"
          value={filters.workers ?? ''}
          onChange={(e) => setFilters({ workers: e.target.valueAsNumber || null })}
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

      <style>{`
        .data-list-container {
          padding: 20px;
          font-family: sans-serif;
          background-color: white;
          color: black;
        }
        .filter-controls {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }
        .filter-controls input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .data-table th, .data-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .data-table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .data-table tbody tr:nth-child(even) {
          background-color: white;
        }
        .data-table tbody tr:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default DataList;
