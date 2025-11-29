# nuqs example
This is an example project demonstrating the usage of the [nuqs](https://github.com/motozono/nuqs) library for managing URL query string state in React applications.

The project includes two main components: DataList and DataListNoNuqs. The DataList component utilizes the nuqs library to synchronize its state with the URL query string, while the DataListNoNuqs component manages its state internally without using nuqs.

Both components display a list of data items and provide filtering functionality based on user input. The shared styles for both components are located in the `src/assets/styles/DataListStyles.css` file.

## Getting Started
To run the example project, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/motozono/nuqs.git
2. Navigate to the example directory:
   ```bash
   cd nuqs/example-nuqs
3. Install the dependencies:
   ```bash
   npm install
4. Start the development server:
   ```bash
   npm run dev
5. Open your browser and navigate to `http://localhost:3000` to see the example in action.

## Project Structure
- `src/components/DataList.tsx`: The DataList component that uses nuqs for URL query string state management.
- `src/components/DataListNoNuqs.tsx`: The DataListNoNuqs component that manages state internally without nuqs.
- `src/assets/styles/DataListStyles.css`: Shared styles for both DataList and DataListNoNuqs components.
- `src/data/m010_data_cleaned_final.json`: Sample data used by both components.