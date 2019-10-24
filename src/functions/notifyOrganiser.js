module.exports.handler = async (event) => {
    const orderPlaced = JSON.parse(event.Records[0].Sns.Message);

    console.log(orderPlaced);

    return 'all done';
};