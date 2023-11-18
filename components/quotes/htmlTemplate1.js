export const quoteTemplate = (
  udate,
  uname,
  uemail,
  uphone,
  ubookref,
  uaddress1,
  uaddress2,
  uproperty,
  umovers,
  umileage,
  uduration,
  udate2,
  upackage,
  utime,
  uincludes1,
  uexcludes1,
  ucharge,
  uvat,
  utotal,
  ulink
) => {
  return `
  <html>
    <div style="display: flex; flex-direction: column; padding: 15px; background-color: white; border-radius: 0px; margin: 10px; margin-left: 50px;">
      <div style="width: 100%; padding: 30px; display: flex; justify-content: space-between; align-items: center; background-color: rgba(169, 169, 169, 0.2); border: 1.5px solid black;">
        <div style="display: flex; flex-direction: column;">
          <img src="/rss_logo2.svg" alt="" style="height: 80px;" />
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; text-align: right;">
          <p style="font-weight: bold; font-size: 30px; margin-top: 0; width: 100%; text-transform: uppercase;">Move Quote</p>
          <p style="font-size: 14px;">
            <span style="font-weight: bold;">Date:</span> ${udate}
          </p>
        </div>
      </div>
    
      <div style="background-color: #0078d4; padding: 10px; padding-left: 20px; margin-top: 0; border: 1.5px solid black;">
        <p style="color: white; font-weight: bold; font-size: 18px; text-transform: uppercase;">Quote to:</p>
      </div>
    
      <div style="font-size: 18px;">
        <table style="border-collapse: collapse; width: 100%;">
          <tbody>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Name</td>
              <td style="border: 1.5px solid black; width: 75%;">${uname}</td>
            </tr>
            <tr>
              <td style="border: 1.5px  solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Email</td>
              <td style="border: 1.5px solid black; width: 75%;">${uemail}</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); font-weight: bold;">Phone</td>
              <td style="border: 1.5px solid black;">${uphone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <div style="background-color: #0078d4; padding: 10px; padding-left: 20px; margin-top: 0; border: 1.5px solid black;">
        <p style="color: white; font-weight: bold; font-size: 18px; text-transform: uppercase;">Move Details:</p>
      </div>
    
      <div style="font-size: 18px;">
        <table style="border-collapse: collapse; width: 100%;">
          <tbody>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Book Ref</td>
              <td style="border: 1.5px solid black; width: 75%;">${ubookref}</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Collected From</td>
              <td style="border: 1.5px solid black; width: 75%;">${uaddress1}</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Delivered To</td>
              <td style="border: 1.5px solid black; width: 75%;">${uaddress2}</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Property Type</td>
              <td style="border: 1.5px solid black; width: 75%;">${uproperty}</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Number of Movers</td>
              <td style="border: 1.5px solid black; width: 75%;">${umovers}</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Mileage</td>
              <td style="border: 1.5px solid black; width: 75%;">${umileage} miles</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Move Duration</td>
              <td style="border: 1.5px solid black; width: 75%;">${uduration} hours</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Move Date</td>
              <td style="border: 1.5px solid black; width: 75%;">${udate2}</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Move Package</td>
              <td style="border: 1.5px solid black; width: 75%;">${upackage} Package</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); font-weight: bold;">Move Time</td>
              <td style="border: 1.5px solid black;">${utime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <div style="background-color: #0078d4; padding: 10px; padding-left: 20px; margin-top: 0; border: 1.5px solid black;">
        <p style="color: white; font-weight: bold; font-size: 18px; text-transform: uppercase;">Quote Includes:</p>
      </div>
    
      <div style="font-size: 18px;">
        <table style="border-collapse: collapse; width: 100%;">
          <tbody>
            ${uincludes1}
          </tbody>
        </table>
      </div>
    
      <div style="background-color: #0078d4; padding: 10px; padding-left: 20px; margin-top: 0; border: 1.5px solid black;">
        <p style="color: white; font-weight: bold; font-size: 18px; text-transform: uppercase;">Quote Excludes:</p>
      </div>
    
      <div style="font-size: 18px;">
        <table style="border-collapse: collapse; width: 100%;">
          <tbody>
          ${uexcludes1}
          </tbody>
        </table>
      </div>
    
      <div style="background-color: #0078d4; padding: 10px; padding-left: 20px; margin-top: 0; border: 1.5px solid black;">
        <p style="color: white; font-weight: bold; font-size: 18px; text-transform: uppercase;">Quote Price:</p>
      </div>
    
      <div style="font-size: 18px;">
        <table style="border-collapse: collapse; width: 100%;">
          <tbody>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">Charge</td>
              <td style="border: 1.5px solid black; font-size: 18px; font-weight: bold; width: 75%;">${ucharge}</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); width: 25%; font-weight: bold;">VAT</td>
              <td style="border: 1.5px solid black; font-size: 18px; font-weight: bold; width: 75%;">${uvat}</td>
            </tr>
            <tr>
              <td style="border: 1.5px solid black; background-color: rgba(0, 120, 212, 0.1); font-weight: bold;">Total</td>
              <td style="border: 1.5px solid black; font-size: 18px; font-weight: bold; width: 75%;">${utotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <div style="display: flex; flex-direction: column; margin-top: 20px;">
        <p style="font-weight: bold; font-size: 14px; width: 100%; text-align: center; margin-top: 20px;">Removals Selfstorage Amwell St, Islington LONDON EC1R 1UR United Kingdom</p>
        <p style="font-weight: bold; font-size: 13px; width: 100%; text-align: center; margin-top: 10px;">KENT: Medway: 01634-940721 | Tunbridge Wells: 01892 234350 | Sevenoaks: 01732 240501 | Gravesend: 01474 632503</p>
        <p style="font-weight: bold; font-size: 13px; width: 100%; text-align: center; margin-top: 7px;">ESSEX: Basildon: 01268 937401 | Chelmsford: 01425 206510</p>
      </div>
    
      <div style="display: flex; justify-content: center; align-items: center; space-x: 20px; width: 100%; margin-top: 20px;">
        <img src="/guarantee.png" alt="" style="height: 110px; width: fit-content;" />
        <img src="/cancel.png" alt="" style="height: 100px; width: fit-content;" />
      </div>
    </div>
    
    <div style="width: 100%; display: flex; justify-content: center; margin-top: 50px; margin-bottom: 50px;">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <a href=${ulink} style="background-color: #0078d4; color: white; display: flex; align-items: center; space-x: 5px; height: 60px; width: 100%;">PAY NOW</a>
      </div>
    </div>
  </html>  `;
};
