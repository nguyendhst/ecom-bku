const createMomoOrder = async () => {
    // http://ec2-52-221-206-32.ap-southeast-1.compute.amazonaws.com:8080/api/v1/transaction
    //{
    //	"userName": "mock",
    //	"items": "abcd",
    //	"amounts": 200000,
    //	"redirectURL": "https://www.facebook.com"
    //  }

    const response = await fetch(
        "http://ec2-52-221-206-32.ap-southeast-1.compute.amazonaws.com:8080/api/v1/transaction",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: "mock",
                items: "abcd",
                amounts: 200000,
                redirectURL: "https://www.facebook.com",
            }),
        }
    );

    const resp = await response.json();

    return resp.payUrl;
};
