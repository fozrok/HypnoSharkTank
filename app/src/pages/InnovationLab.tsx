import { useApp } from '../store/store';
import NicheFinder from './features/NicheFinder';
import ModelBuilder from './features/ModelBuilder';
import FeedingFrenzy from './features/FeedingFrenzy';
import RevenueProjector from './features/RevenueProjector';
import MessagingEngine from './features/MessagingEngine';
import LaunchSprint from './features/LaunchSprint';
import RealityCheck from './features/RealityCheck';

const STEP_COMPONENTS: Record<number, React.ComponentType> = {
    1: NicheFinder,
    2: ModelBuilder,
    3: FeedingFrenzy,
    4: RevenueProjector,
    5: MessagingEngine,
    6: LaunchSprint,
    7: RealityCheck,
};

export default function InnovationLab() {
    const { currentStep } = useApp();
    const StepComponent = STEP_COMPONENTS[currentStep] || NicheFinder;

    return (
        <main className="app-main with-sidebar">
            <StepComponent />
        </main>
    );
}
