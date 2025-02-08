import React from 'react';

export function Scores() {
  return (
    <main className="container-fluid bg-secondary text-center">
        <table className="table table-warning table-striped-columns">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Percent Completed</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>도윤 이</td>
              <td>100%</td>
              <td>May 20, 2021</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Annie James</td>
              <td>100%</td>
              <td>June 2, 2021</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Gunter Spears</td>
              <td>97%</td>
              <td>July 3, 2020</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Sam Roberts</td>
                <td>87%</td>
                <td>July 22, 2020</td>
            </tr>
          </tbody>
        </table>
      </main>
  );
}