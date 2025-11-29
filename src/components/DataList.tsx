import React from 'react';
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
  return (
    <div className="data-list-container">
      <h1>サービス産業動態統計調査</h1>
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
          {data.map((item: DataItem, index: number) => (
            <tr key={index}>
              <td>{item.Region}</td>
              <td>{item.IndustryClassification}</td>
              <td>{item.BusinessActivity_Sales_MillionYen ? Number(item.BusinessActivity_Sales_MillionYen).toLocaleString() : 'N/A'}</td>
              <td>{item.EstablishmentCompany_Sales_MillionYen ? Number(item.EstablishmentCompany_Sales_MillionYen).toLocaleString() : 'N/A'}</td>
              <td>{item.EstablishmentCompany_TotalEmployees_People ? Number(item.EstablishmentCompany_TotalEmployees_People).toLocaleString() : 'N/A'}</td>
              <td>{item.EstablishmentCompany_Dispatchers_People ? Number(item.EstablishmentCompany_Dispatchers_People).toLocaleString() : 'N/A'}</td>
              <td>{item.EstablishmentCompany_Recipients_People ? Number(item.EstablishmentCompany_Recipients_People).toLocaleString() : 'N/A'}</td>
              <td>{item.EstablishmentCompany_Workers_People ? Number(item.EstablishmentCompany_Workers_People).toLocaleString() : 'N/A'}</td>
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
