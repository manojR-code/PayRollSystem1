import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StackedAreaChart from '../Charts/CurrencyBudget';
import BasicPie from '../Charts/PieChart';
import '../Style/Payments.css';
import ColorButtons from '../assets/Button';


const TaxDetect = (amt) => {
  if (amt < 300000) return 0;
  if (amt <= 600000) return 5;
  if (amt <= 900000) return 10;
  if (amt <= 1200000) return 20;
  return 30;
};

function createRow(id, role, firstName, lastName, salary) {
  const taxPercent = TaxDetect(salary);
  return { id, role, firstName, lastName, salary, taxPercent };
}

const rows = [
  createRow(1001, 'Software Engineering', 'Manoj', 'R', 1000000),
  createRow(1002, 'Marketing', 'Akshay', 'S', 1500000),
];


const formatCurrency = (num) => `₹${num.toLocaleString()}`;

export default function SpanningTable() {
  return (
    <div className="color">
      {/* Charts Section */}
      <div className="Con">
        <div className="Cards">
          <h4>Tax Rate Based On LPA</h4>
          <BasicPie />
        </div>
        <div className="Cards">
          <h4>Budget Allocation</h4>
          <StackedAreaChart />
        </div>
      </div>

      {/* Table Section */}
      <TableContainer
        component={Paper}
        sx={{ marginTop: '50px', width: '100%', overflowX: 'auto' }}
      >
        <Table
          sx={{ minWidth: { xs: 300, sm: 500, md: 700 }, borderCollapse: 'separate' }}
          aria-label="employee salary table"
        >

          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Employee Salary Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const monthlySalary = Math.round(row.salary / 12);
              const monthlyTax = Math.round((monthlySalary * row.taxPercent) / 100);
              const netSalary = monthlySalary - monthlyTax;

              return (
                <React.Fragment key={row.id}>
                  {/* Header row for employee */}
                  <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                    <TableCell align="left">Role</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">PF + Tax %</TableCell>
                    <TableCell align="right">Base Salary</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.taxPercent} %</TableCell>
                    <TableCell align="right">{formatCurrency(row.salary)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Monthly</TableCell>
                    <TableCell align="right">{formatCurrency(monthlySalary)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{row.taxPercent} %</TableCell>
                    <TableCell align="right">{formatCurrency(monthlyTax)}</TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell colSpan={2}>Net Salary</TableCell>
                    <TableCell align="right">{formatCurrency(netSalary)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={5} sx={{ border: 0, height: 30 }} />
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ColorButtons />
    </div>
  );
}
