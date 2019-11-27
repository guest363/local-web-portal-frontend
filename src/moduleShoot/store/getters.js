const getters = {
    GET_SHOOT_ON_LESSON(state) {
        return lesson => {
            switch (lesson) {
                case "1":
                    return 3;
                case "2":
                    return 3;
                case "3":
                    return 10;
            }
        }
    },
    GET_HISTORY(state) {
        return state.shootHistory;
    }
};
export default getters;