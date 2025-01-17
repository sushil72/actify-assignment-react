# React Data Table Component

A responsive React data table component with features including sorting, searching, pagination, and CSV export functionality.

## Features

### 1. Data Display
- Responsive table layout
- Clear column headers
- Status indicators with color coding
- Hover effects for better row identification

### 2. Navigation
- Side navigation menu with:
  - Dashboard
  - Account
  - Reports
  - Settings
- Active state highlighting
- Hover effects for better UX

### 3. Sorting
- "View" button to toggle between ascending and descending order
- Sorts based on account name
- Visual indicator of current sort direction
- Maintains sort state during filtering and pagination

### 4. Search Functionality
- Real-time search across all fields
- Search bar with icon
- Updates results instantly as user types
- Maintains current sort order while searching

### 5. CSV Export
- Export button for downloading data
- Exports currently filtered/sorted data
- Proper CSV formatting with headers
- Automatic download trigger

### 6. Pagination
- Shows 5 entries per page
- Previous/Next navigation
- Page number indicators
- Disabled states for boundary pages
- Entry count display

## Technical Implementation

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "react-redux": "^8.x",
    "lucide-react": "^0.263.1"
  }
}
```

### Key Components

#### Table Component
- Main component handling data display and interactions
- Uses Redux for state management
- Implements React Router for navigation
- Utilizes Lucide React for icons

#### State Management
```javascript
// Key state elements
const [currentPage, setCurrentPage] = useState(1);
const [sortOrder, setSortOrder] = useState("ascending");
const [searchTerm, setSearchTerm] = useState("");
```

### Data Structure
The component expects data in the following format:
```javascript
{
  accountName: string,
  email: string,
  phone: string,
  website: string,
  industry: string,
  status: "Active" | "Inactive",
  remark: string
}
```

## Styling

### CSS Framework
- Tailwind CSS for styling
- Responsive design principles
- Custom color schemes for status indicators

### Color Scheme
- Primary Blue: `bg-blue-500`
- Success Green: `bg-green-100`/`text-green-800`
- Error Red: `bg-red-100`/`text-red-800`
- Neutral Gray: `bg-gray-50`/`bg-gray-200`

## Usage

1. **Basic Setup**
```javascript
import Table from './components/Table';

function App() {
  return <Table />;
}
```

2. **Redux Store Setup**
```javascript
// Ensure your Redux store has a table reducer with tableData
const store = configureStore({
  reducer: {
    table: tableReducer
  }
});
```

3. **Data Format Requirements**
```javascript
// Example data structure
const tableData = [
  {
    accountName: "Company A",
    email: "contact@companya.com",
    phone: "123-456-7890",
    website: "www.companya.com",
    industry: "Technology",
    status: "Active",
    remark: "Premium client"
  },
  // ... more entries
];
```

## Performance Considerations

- Uses `useMemo` for optimized sorting and filtering
- Implements pagination to handle large datasets
- Efficient search algorithm across multiple fields

## Browser Support

- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile and tablet views
- Graceful degradation for older browsers
