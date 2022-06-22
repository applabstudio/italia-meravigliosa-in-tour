export const subscribeToConvertKit = async ({ email }: { email: string }) => {


  if (!email) {
    return alert("Email is required.");
  }

  try {
    const FORM_ID = '3374938';
    const API_KEY = 'EyXsBSy19wUCVAoj3TKKJw';
    const API_URL = 'https://app.convertkit.com/';

    //what do we want to send to CK?
    const data = { email, api_key: API_KEY };


    // ship it :)
    const response = await fetch('https://api.convertkit.com/v3/forms/3375255/subscribe', {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    // return any error from CK
    if (response.status >= 400) {
      return alert("There was an error subscribing to the list.");
    }


    return alert("Succesfully Subscribed")
  } catch (error: any) {
    alert(error.message || error.toString())

  }
};
