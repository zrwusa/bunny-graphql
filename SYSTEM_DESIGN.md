<table border="1">
  <tr>
    <th>Scenario</th>
    <th>Use PostgreSQL</th>
    <th>Use MongoDB</th>
    <th>Use Elasticsearch</th>
    <th>Use Redis</th>
  </tr>
  <tr>
    <td>Orders & Payments</td>
    <td>✅</td>
    <td>❌</td>
    <td>❌</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>Inventory Management</td>
    <td>✅</td>
    <td>❌</td>
    <td>❌</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>User Data</td>
    <td>✅</td>
    <td>❌</td>
    <td>❌</td>
    <td>✅ (Session)</td>
  </tr>
  <tr>
    <td>Product Details</td>
    <td>❌</td>
    <td>✅</td>
    <td>❌</td>
    <td>✅ (Cache Hot Items)</td>
  </tr>
  <tr>
    <td>Search & Recommendation</td>
    <td>❌</td>
    <td>❌</td>
    <td>✅</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>Logs & Tracking</td>
    <td>❌</td>
    <td>✅</td>
    <td>✅</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>Shopping Cart & Token</td>
    <td>❌</td>
    <td>❌</td>
    <td>❌</td>
    <td>✅</td>
  </tr>
</table>
