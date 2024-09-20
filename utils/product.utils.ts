import moment from "moment";
import { Quotation } from "@interfaces/product.interface";

export const generateInvoiceHtml = (quotation: Quotation) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">

    <div style="max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr>
                    <th style="text-align: left; padding: 10px 0; border-bottom: 2px solid #ccc;">Product</th>
                    <th style="text-align: left; padding: 10px 0; border-bottom: 2px solid #ccc;">Qty</th>
                    <th style="text-align: left; padding: 10px 0; border-bottom: 2px solid #ccc;">Rate</th>
                    <th style="text-align: left; padding: 10px 0; border-bottom: 2px solid #ccc;">Total</th>
                </tr>
            </thead>
            <tbody>
            ${quotation.products
              .map(
                (product) => `
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${
                      product.name
                    }</td>
                    <td style="color: #4A90E2; padding: 10px 0; border-bottom: 1px solid #ddd;"><b>${
                      product.qty
                    }</b></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${
                      product.rate
                    }</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${
                      product.qty * product.rate
                    }</td>
                </tr>
                `
              )
              .join()}

            </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end">
            <div>
                <p style="margin: 0;">Total: ${quotation.total}</p>
                <p style="margin: 0;">GST: ${quotation.gst}%</p>
                <hr/>
                <p style="margin: 0; font-size: 18px; font-weight: bold;">Grand Total: <span style="color: #4A90E2;">₹${
                  quotation.total + (quotation.total * quotation.gst) / 100
                }</span></p>
                <hr/>
            </div>
        </div>

        <p style="text-align: left; color: #666; font-size: 12px;">Valid until: <b>${moment()
          .add(1, "day")
          .format("DD/MM/YY")}</b></p>

        <div style="background-color: #333; color: #fff; padding: 15px; border-radius: 5px;  text-align: center;">
            <p style="margin: 0; font-size: 12px;">Terms and Conditions</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">
                We are happy to supply any further information you may need and trust that you call on us to fill your order,
                which will receive our prompt and careful attention.
            </p>
        </div>
    </div>

</body>
</html>
`;
};
