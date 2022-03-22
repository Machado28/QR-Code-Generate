const express = require("express");
const qrCode = require("qrcode");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  const { data } = req.body;

  const info = data;

  if (!info) return res.status(402).json({ message: "No data!" });

  qrCode.toDataURL(info, (err, src) => {
    if (err)
      return res
        .status(500)
        .json({ error: "An error unspected occured on server:" + err });

    res.status(200).json({
      data: src,
    });
  });
});

app.listen(port, () => {
  console.log(` The Server is running on port: ${port}`);
});
app.listen().removeAllListeners;
