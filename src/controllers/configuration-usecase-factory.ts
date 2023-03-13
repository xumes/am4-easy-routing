import { CapacityCalculation } from "../domain/calculation/capacity"
import { ConfigurationCalculation } from "../domain/calculation/configuration"
import { DemandCalculation } from "../domain/calculation/demand"
import { UnusedDemandCalculation } from "../domain/calculation/unused-demand"
import { ConfigurationUsecase } from "../usecase/configuration"

export class MakeConfigurationUsecase {
    static build(): ConfigurationUsecase {
        const capacityCalculation = new CapacityCalculation()
        const demandCalculation = new DemandCalculation()
        const configurationCalculation = new ConfigurationCalculation()
        const unusedDemandCalculation = new UnusedDemandCalculation()

        return new ConfigurationUsecase(
            capacityCalculation,
            demandCalculation,
            configurationCalculation,
            unusedDemandCalculation
        )
    }
}