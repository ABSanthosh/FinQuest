export default async (req, res) => {
  const spreadsheetId = "1SvyMyOn0r3SuKh9HLY8qodZ9w12qamf3JB9CI5UAqpQ";
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`
  );
  const result = await response.text();
  result.replace(
    /.*google.visualization.Query.setResponse\({(.*?)}\);?/s,
    "{$1}"
  );
  console.log(result);
  // const json = result;
  const json = JSON.parse(
    result.replace(
      /.*google.visualization.Query.setResponse\({(.*?)}\);?/s,
      "{$1}"
    )
  );

  const headings = json.table.cols.map((item) => item.label);

  let data = json.table.rows.map((item) => {
    // console.log(item);
    let row = {};
    item.c.forEach((cell, idx) => {
      row[headings[idx]] = cell?.v ?? null;
    });
    return row;
  });

  res.status(200).json({ data });
};
