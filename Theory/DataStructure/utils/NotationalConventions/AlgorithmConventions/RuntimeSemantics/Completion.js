class CompletionImpl {
    constructor(init) {
        if (new.target === CompletionImpl) {
            switch (init.Type) {
                case 'normal':
                    return createNormalCompletion(init);
                case 'break':
                    return createBreakCompletion(init);
                case 'continue':
                    return createContinueCompletion(init);
                case 'return':
                    return createReturnCompletion(init);
                case 'throw':
                    return createThrowCompletion(init);
                default:
                    throw new OutOfRange('new Completion', init);
            }
        }

        const { Type, Value, Target } = init;
    }
}
