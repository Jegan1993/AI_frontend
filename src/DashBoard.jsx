import React from "react";

function DashBoard() {
  const pipeline = [
    {
      title: "New Leads",
      count: 18,
      color: "primary",
    },
    {
      title: "Contacted",
      count: 10,
      color: "info",
    },
    {
      title: "Qualified",
      count: 7,
      color: "warning",
    },
    {
      title: "Quotation Sent",
      count: 4,
      color: "secondary",
    },
    {
      title: "Negotiation",
      count: 2,
      color: "dark",
    },
    {
      title: "Won",
      count: 3,
      color: "success",
    },
    {
      title: "Lost",
      count: 1,
      color: "danger",
    },
  ];

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">CRM Dashboard</h2>

      <div className="row g-4">
        {pipeline.map((item, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
            <div
              className={`card border-0 shadow bg-${item.color} text-white`}
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body text-center">
                <h5 className="fw-bold">{item.title}</h5>

                <h1 className="display-4 fw-bold">{item.count}</h1>

                <small>Total Leads</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-5" />

      <h3 className="fw-bold mb-3">Sales Pipeline Overview</h3>

      <div className="card shadow border-0">
        <div className="card-body">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Stage</th>
                <th>Total Leads</th>
              </tr>
            </thead>

            <tbody>
              {pipeline.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
