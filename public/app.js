// AJAX call to retrieve user timeline data
const userId = '1'; // Replace with the actual user ID
$.ajax({
  url: `http://localhost:8000/timeline/${userId}`,
  method: 'GET',
  success: function (data) {
    // Handle the retrieved data and update the UI
    displayUserTimeline(data);
  },
  error: function (error) {
    console.error('Error retrieving user timeline:', error);
  },
});

// Function to display user timeline data on the page in a single table
function displayUserTimeline(data) {
  const userTimelineDiv = $('#userTimeline');

  // Clear existing content
  userTimelineDiv.empty();

  // Create a table element
  const table = $('<table>').addClass('user-timeline-table');

  // Create table header
  const tableHeader = $('<thead>').append(
    $('<tr>').append(
      $('<th>').text('User ID'),
      $('<th>').text('User'),
      $('<th>').text('Date'),
      $('<th>').text('Text'),
      $('<th>').text('Time'),
      $('<th>').text('Views')
    )
  );

  // Append the header to the table
  table.append(tableHeader);

  // Create table body
  const tableBody = $('<tbody>');

  // Iterate through the retrieved data and append rows to the table body
  data.forEach(post => {
    const row = $('<tr>').append(
      $('<td>').text(post.user_id),
      $('<td>').text(post.user_name),
      $('<td>').text(post.date_of_post),
      $('<td>').text(post.text_post),
      $('<td>').text(post.time_of_post),
      $('<td>').text(post.views)
    );

    // Append the row to the table body
    tableBody.append(row);
  });

  // Append the table body to the table
  table.append(tableBody);

  // Append the table to the userTimelineDiv
  userTimelineDiv.append(table);
}
