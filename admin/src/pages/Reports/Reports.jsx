import React from 'react'
import { useState } from 'react'
import './Report.css'
import { useEffect } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf';
import { assets } from '../../assets/assets.js'
import autoTable from 'jspdf-autotable';

const Reports = ({ url }) => {
  const [showSecList, setShowSecList] = useState(true)
  const [model, setModel] = useState()
  const [startingDate, setStartDate] = useState()
  const [endingDate, setEndDate] = useState()
  const [all, setAll] = useState(false)
  const [data, setData] = useState([])
  const [isDateRequired, setIsDateRequired] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false)
  const [isModelSelct, setIsModelSelect] = useState("")
  const [isRangeSelct, setIsRangeSelect] = useState("")


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    let pageNumber = 1;

    const formattedModel = capitalizeFirstLetter(isModelSelct.replace("Model", ""));
    const formattedRange = capitalizeFirstLetter(isRangeSelct);
    const title = `${formattedModel} Report of ${formattedRange}`;

    // Add Image (Logo) - Left Side
    const imageUrl = assets.logo;
    const imageWidth = 30;  // Adjust size if needed
    const imageHeight = 30;
    const imageX = 10; // Left margin
    const imageY = 10; // From top

    pdf.addImage(imageUrl, 'JPEG', imageX, imageY, imageWidth, imageHeight);

    // Add Address (Right-Aligned, Same Line as Logo)
    const addressX = pageWidth - 10; // Right margin
    const addressY = imageY + 5; // Align with the logo

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text("Global Restaurant, Vaishnodevi Circle,", addressX, addressY, { align: 'right' });
    pdf.text("Sardar Patel Ring Rd, Ahmedabad, Gujarat 382470", addressX, addressY + 7, { align: 'right' });
    pdf.text("Contact: +91-6355348056", addressX, addressY + 14, { align: 'right' });

    // Add Horizontal Line Below Header
    const lineY = imageY + imageHeight + 5; // Below both logo and address
    pdf.setDrawColor(0);
    pdf.line(10, lineY, pageWidth - 10, lineY);

    // Add Report Title (Centered)
    pdf.setFontSize(16);
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (pageWidth - titleWidth) / 2, lineY + 10);

    // Add Table Below Title
    let tableStartY = lineY + 15;
    
    // Table Logic (Same as before)
    let headers = [];
    let tableData = [];

    switch (isModelSelct) {
        case "userModel":
            headers = ["Customer Name", "Email", "Phone No.", "Area", "City"];
            tableData = data.map(item => [
                item.name, item.email, item.phoneNo || "N/A", item.areaId?.area || "N/A", item.city
            ]);
            break;

        case "foodModel":
            headers = ["Dish Name", "Price", "Category", "Status", "Description"];
            tableData = data.map(item => [
                item.name, item.price, item.category?.name || "N/A",
                item.status ? "Available" : "Out of Stock",
                item.description.length > 15 ? item.description.substring(0, 15) + "..." : item.description
            ]);
            break;

        case "ReservationModel":
            headers = ["Customer Name", "People", "Time", "Date", "Status"];
            tableData = data.map(item => [
                `${item.First_Name} ${item.Last_name}`, item.People, item.Time,
                new Date(item.Date).toLocaleDateString('en-GB'), item.Status
            ]);
            break;

        case "orderModel":
            headers = ["Customer", "Items", "Date", "Amount", "Area"];
            tableData = data.map(item => [
                item.address?.name,
                item.items.map(subItem => `${subItem.name} x (${subItem.quantity})`).join(", "),
                new Date(item.date).toLocaleDateString('en-GB'),
                item.amount,
                item.address?.areaName
            ]);
            break;

        case "Payments":
            headers = ["Customer Name", "Email", "Amount", "Status", "Type"];
            tableData = data.map(item => [
                item.user?.name, item.user?.email, item.amount, item.status, item.type
            ]);
            break;

        case "FeedbackModel":
            headers = ["Customer Name", "Date", "Time", "Is Public", "Review"];
            tableData = data.map(item => [
                item.userName,
                new Date(item.feedbackDT).toLocaleDateString('en-GB'),
                new Date(item.feedbackDT).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
                item.isPublic ? "Yes" : "No",
                item.feedbackText.length > 15 ? item.feedbackText.substring(0, 15) + "..." : item.feedbackText
            ]);
            break;

        default:
            headers = ["No Data Available"];
            tableData = [];
            break;
    }

    // ✅ Use autoTable properly
    autoTable(pdf, {
        head: [headers],
        body: tableData,
        startY: tableStartY,
        theme: "striped",
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [100, 100, 100], textColor: 255 },
        margin: { top: 45, bottom: 20 },
        didDrawPage: () => {
            // Add Footer Email
            pdf.setFontSize(8);
            pdf.text("Email: sdpproject@gmail.com", pageWidth - 40, pageHeight - 10, { align: 'right' });

            // Page number at the bottom-center
            pdf.setFontSize(10);
            pdf.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
            pageNumber++;
        }
    });

    // Save the PDF
    pdf.save(`${title}.pdf`);
};








  const handleSelectModel = (event) => {
    const selectedValue = event.target.value;




    if (selectedValue === "foodModel") {
      setShowSecList(false)
      setIsDateRequired(false);
    } else {
      setShowSecList(true)
      setIsDateRequired(true);
    }
    setModel(selectedValue)
  };

  const handleSelectRange = (event) => {
    const selectedRange = event.target.value;
    let startDate, endDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedRange === "Last Month") {
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0);
      setAll(false)
    } else if (selectedRange === "This Month") {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setAll(false)
    } else if (selectedRange === "This Week") {
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Get Sunday of the week
      startDate = firstDayOfWeek;
      today.setHours(23, 59, 59, 999);
      endDate = new Date(today);
      setAll(false)
    } else if (selectedRange === "Today") {
      startDate = new Date(today);
      today.setHours(23, 59, 59, 999);
      endDate = new Date(today);

      console.log(endDate)
      setAll(false)
    } else {
      setAll(true)
      startDate = null;
      endDate = null;
    }
    setStartDate(startDate)
    setEndDate(endDate)
    setIsRangeSelect(selectedRange)
  };


  const onSubmitHandler = async (e) => {

    e.preventDefault()
    if (model) {
      console.log(model)
      console.log(startingDate)
      console.log(endingDate)
      const params = {
        model: model,
        all: all,
      };
      // ✅ Only send startDate & endDate if "All" is NOT selected
      if (!all) {
        params.startDate = startingDate;
        params.endDate = endingDate;
      }
      try {
        const res = await axios.get(`${url}/api/report/getreport`, { params });
        //console.log(res.data.data);
        if (res.data.success) {
          setData(res.data.data)
          setIsSubmit(true)
          setIsModelSelect(model)

        }
      } catch (error) {
        console.error("Error fetching reports:", error.response?.data || error.message);
      }

    }
  }
  useEffect(() => {
    // console.log(data)
    console.log(isRangeSelct)
  }, [isRangeSelct])




  return (
    <div className='outer'>
      <h2 className='header' >Reports</h2>
      <form onSubmit={onSubmitHandler}>
        <div className='head'>

          <div className='list'>
            <label htmlFor="main-list">Filter by</label>
            <select onChange={(e) => handleSelectModel(e)} id="main-list" name="main-list" required>
              <option value="" disabled selected> Select Option</option>
              <option value="userModel" >Customers Details</option>
              <option value="foodModel" >Current Menu</option>
              <option value="ReservationModel">Reservations Details</option>
              <option value="orderModel">Orders Details</option>
              <option value="Payments">Payments Details</option>
              <option value="FeedbackModel">All Reviews</option>
            </select>
          </div>
          <div className={showSecList ? 'list' : 'hide'}>
            <label htmlFor="second-list">Date range</label>
            <select onChange={handleSelectRange} id="second-list" name="second-list" required={isDateRequired}>
              <option value="" disabled selected>Select Time</option>
              <option value="Last Month">Last Month</option>
              <option value="This Month">This Month</option>
              <option value="This Week">This Week</option>
              <option value="Today">Today</option>
              <option value="All">All</option>
            </select>
          </div>
          <button type='submit'>Generate</button>
          {/* <div className='Downlode'>
            <button onClick={downloadPDF}><img src={assets.download} alt="downloading-updates"/></button>
            </div> */}
          <div className='Downlode'>
            <button
              onClick={downloadPDF}
              disabled={!isSubmit || data.length === 0}
              style={{ opacity: (!isSubmit || data.length === 0) ? 0.5 : 1, cursor: (!isSubmit || data.length === 0) ? 'not-allowed' : 'pointer' }}>
              <img src={assets.download} alt="downloading-updates" />
            </button>
          </div>

        </div>

      </form>

      {isSubmit ? (
        <div className='body'>
          <div className='list-data'>
            <div className='data-heading'>
              {isModelSelct === "userModel" && (
                <>
                  <b>Caustomer Name</b> <b>Email</b> <b>Phone no.</b> <b>Area</b> <b>City</b>
                </>
              )}
              {isModelSelct === "orderModel" && (
                <>
                  <b>Customer</b> <b>Items</b> <b>Date</b> <b>Amount</b> <b>Area</b>
                </>

              )}
              {isModelSelct === "foodModel" && (
                <>
                  <b>Dish Name</b>  <b>Price</b> <b>Category</b> <b>Status</b> <b>Description</b>
                </>
              )}
              {isModelSelct === "ReservationModel" && (
                <>
                  <b>Caustomer Name</b> <b>People</b> <b>Time</b> <b>Date</b> <b>Status</b>
                </>
              )}
              {isModelSelct === "FeedbackModel" && (
                <>
                  <b>Caustomer Name</b> <b>Date</b> <b>Time</b> <b>Is Public</b> <b>Review</b>
                </>
              )}
              {isModelSelct === "Payments" && (
                <>
                  <b>Caustomer Name</b> <b>Email</b> <b>Amount</b> <b>Status</b> <b>Type</b>
                </>
              )}

            </div>
            <div>
              {data.length > 0 ? (
                data.map((item) => {
                  switch (isModelSelct) {
                    case "userModel":
                      return (
                        <div key={item.id} className="dataList-user">
                          <p>{item.name}</p>
                          <p>{item.email}</p>
                          <p>{item.phoneNo || "N/A"}</p>
                          <p>{item.areaId?.area || "N/A"}</p>
                          <p>{item.city}</p>
                        </div>
                      );

                    case "foodModel":
                      return (
                        <div key={item.id} className="dataList-food">
                          <p>{item.name}</p>
                          <p>{item.price}</p>
                          <p>{item.category?.name || "N/A"}</p>
                          <p>{item.status ? "Available" : "Out of Stock"}</p>
                          <p>{item.description.length > 15 ? item.description.substring(0, 15) + "..." : item.description}</p>
                        </div>
                      );

                    case "ReservationModel":
                      return (
                        <div key={item.id} className="dataList-res">
                          <p>{item.First_Name + " " + item.Last_name}</p>
                          <p>{item.People}</p>
                          <p>{item.Time}</p>
                          <p>{new Date(item.Date).toLocaleDateString('en-GB')}</p>
                          <p>{item.Status}</p>
                        </div>
                      );

                    case "orderModel":
                      return (
                        <div key={item.id} className="dataList-odr">
                          <p>{item.address?.name}</p>
                          <p>
                            {item.items.map((subItem, index) => (
                              subItem.name + " x (" + subItem.quantity + ") "

                            ))}
                          </p>
                          <p>{new Date(item.date).toLocaleDateString('en-GB')}</p>
                          <p>{item.amount}</p>
                          <p>{item.address?.areaName}</p>
                        </div>
                      );

                    case "Payments":
                      return (
                        <div key={item.id} className="dataList-pay">
                          <p>{item.user?.name}</p>
                          <p>{item.user?.email}</p>
                          <p>{item.amount}</p>
                          <p>{item.status}</p>
                          <p>{item.type}</p>
                        </div>
                      );
                    case "FeedbackModel":
                      return (
                        <div key={item.id} className="dataList-fed">
                          <p>{item.userName}</p>
                          <p>{new Date(item.feedbackDT).toLocaleDateString('en-GB')}</p>
                          <p>{new Date(item.feedbackDT).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
                          <p>{item.isPublic === true ? "Yes" : "No"}</p>
                          <p>{item.feedbackText.length > 15 ? item.feedbackText.substring(0, 15) + "..." : item.feedbackText}</p>
                        </div>
                      );
                    default:
                      return (
                        <div key={item.id} className="dataList">
                          <p>No data available</p>
                        </div>
                      );
                  }
                })
              ) : (
                <p>No Data Available</p>
              )}

            </div>

          </div>
        </div>

      ) : null}
    </div>
  )
}

export default Reports