import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridReact } from 'ag-grid-react';

function Table() {
  const [data, setData] = useState(null);
  const [rowData, setRowData] = useState([] as any[]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {field: "customerName",
        filter: true   , 
    },
    {field: "email",
    filter: true   },
    {field: "id",
    filter: true   },
    {field: "orderNumber",
    filter: true   },
    {field: "phone",
    filter: true   },
    {field: "status",
    filter: true   },
    {field: "totalPrice",
    filter: true   },
  ])
  const [rowDataTicket, setRowDataTicket] = useState([] as any[]);
  const [colDefsTicket, setColDefsTicket] = useState<ColDef[]>([
    {field: "id",
    filter: true   },
    {field: "ticketNumber",
    filter: true   },
    {field: "price",
    filter: true   },
    {field: "ticketType",
    filter: true   },
    {field: "ownerName",
    filter: true   },
    {field: "orderId",
    filter: true   }
  ])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tickets-cloud', {
            headers: {
                'Access-Control-Allow-Origin': '*',
              }
        });
        let orderArray: any[] = [];
        response.data[0].forEach((order: { customerName: string, phone: string, email: string}) => {
          if(order.customerName !== "unknown" && order.email !== "unknown" && order.phone !== "unknown") {
            orderArray.push(order);
          } else {
            console.log(order);
          }
      });
        //setData(response.data);
        setRowData(orderArray);

        let ticketsArray: any[] = []
        response.data[0].forEach((order: { id: string, tickets: { orderId: string; }[]; }) => {
            if(order.tickets.length > 0) {
                order.tickets.forEach((ticket: { orderId: string; }) => {
                    ticket.orderId = order.id;
                    ticketsArray.push(ticket); 
                });
            
            }
        });
        setRowDataTicket(ticketsArray);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data initially
    
    const intervalId = setInterval(fetchData, 10000 * 6); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
    //return () => {};
  }, []); // Empty dependency array ensures effect runs only once on component mount

  
  return (
    <div
    className="ag-theme-quartz" // applying the grid theme
    style={{ height: 500 }} // the grid will fill the size of the parent container
   >
     <AgGridReact
         rowData={rowData}
         columnDefs={colDefs}
         enableCellTextSelection={true}
         ensureDomOrder={true}
     > 
     </AgGridReact>
     <br/>

     <AgGridReact
         rowData={rowDataTicket}
         columnDefs={colDefsTicket}
     > 
     </AgGridReact>
   </div>
  );
}

export default Table;
