const typeUSBArray = [
    "Storage",
    "USB DRIVE",
    "FLASH",
    "Flash",
    "DataTraveler",
    "QUMO",
    "HDD"
];
const typePrinterArray = ["LaserJet", "Printer", "CLX-9252"];
const typeControllerArray = ["Controller"];
const typeMouseArray = ["Mouse"];
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
        if (isThisType(typeUSBArray)) return `usb`;
        else if (isThisType(typePrinterArray)) return `print`;
        else if (isThisType(typeControllerArray)) return `microchip`;
        else if (isThisType(typeMouseArray)) return `location-arrow`;
        else return `question`;
    };
    return `<i class="fa fa-${whatType(
        deviceType
    )} type-icon" aria-hidden="true"></i>`;
};