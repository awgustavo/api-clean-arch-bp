export interface BaseUseCase<Parameter, ReturnType> {
    execute (user: Parameter): ReturnType
}
