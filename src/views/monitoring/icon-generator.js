const typeDescktop = [
    "Тонкий клиент"
];
const typePrinterArray = ["Принтер", "МФУ"];
export default deviceType => {
    if (deviceType === void 0) {
        return ``;
    }
    const whatType = str => {
        const isThisType = typeArray => {
            return typeArray
                .map(type => {
                    const index = str.indexOf(type);
                    return index < 0 ? false : true;
                })
                .includes(true);
        };
        if (isThisType(typeDescktop)) return `desktop`;
        else if (isThisType(typePrinterArray)) return `print`;
        else return `question`;
    };
    return `<i class="fa fa-${whatType(
        deviceType
    )} type-icon" aria-hidden="true"></i>`;
};