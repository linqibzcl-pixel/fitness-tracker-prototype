import Confetti from './Confetti';
import ActivityCalendar from './ActivityCalendar';
import WorkoutLayout from './workout/WorkoutLayout';
import FitnessHeader from './workout/FitnessHeader';
import SessionSummaryRings from './workout/SessionSummaryRings';
import SimulatedHeartRateCard from './workout/SimulatedHeartRateCard';
import WorkoutSessionCard from './workout/WorkoutSessionCard';
import WorkoutControls from './workout/WorkoutControls';
import TargetRepsPicker from './workout/TargetRepsPicker';
import SetHistoryPanel from './workout/SetHistoryPanel';
import TrainingHistoryPanel from './workout/TrainingHistoryPanel';
import ExercisePicker from './workout/ExercisePicker';
import { useSquatWorkout } from '../hooks/useSquatWorkout';

export default function SquatCounter() {
  const w = useSquatWorkout();

  const canSave = w.totalReps > 0;

  return (
    <WorkoutLayout>
      <Confetti trigger={w.triggerConfetti} />

      <div className="w-full max-w-md flex flex-col items-stretch">
        <FitnessHeader
          exerciseName={w.exercise.name}
          weightKg={w.weightKg}
          onWeightKgChange={w.onWeightKgChange}
        />

        <ExercisePicker selectedId={w.exerciseId} onSelect={w.setExerciseId} />

        <SessionSummaryRings
          setsDone={w.completedSets}
          sessionKcal={w.sessionKcal}
          sessionTimeLabel={w.formatTime(w.elapsedSeconds)}
          lifetimeTimeLabel={w.formatTime(w.displayLifetimeSec)}
        />

        <SimulatedHeartRateCard
          bpm={w.simulatedHrBpm}
          zoneLabel={w.simulatedHrZone}
          isSimulationRunning={w.isActive && !w.resting}
          sessionStarted={w.hrSessionStarted}
        />

        <WorkoutSessionCard
          exercise={w.exercise}
          setComplete={w.setComplete}
          targetReps={w.targetReps}
          resting={w.resting}
          restTimer={w.restTimer}
          onSkipRest={w.handleSkipRest}
          isSquatting={w.isSquatting}
          isActive={w.isActive}
          count={w.count}
          flash={w.flash}
          progress={w.progress}
          setsLength={w.sets.length}
          weightKg={w.weightKg}
          setRepsOnlyKcal={w.setRepsOnlyKcal}
          setBonusSoFar={w.setBonusSoFar}
          sessionKcal={w.sessionKcal}
          completedSets={w.completedSets}
        />

        <WorkoutControls
          mode={w.exercise.mode}
          resting={w.resting}
          isActive={w.isActive}
          flash={w.flash}
          onCount={w.handleCount}
          onToggleActive={w.handleToggleActive}
          onReset={w.handleReset}
          onSave={w.saveWorkout}
          canSave={canSave}
        />

        <TargetRepsPicker
          mode={w.exercise.mode}
          options={w.exercise.targetOptions}
          targetReps={w.targetReps}
          onSelect={w.setTargetRepsAndClearCount}
        />

        <div className="mb-6">
          <ActivityCalendar records={w.mergedDayRecords} savedSessions={w.savedSessions} />
        </div>

        <div className="mt-5">
          <SetHistoryPanel exercise={w.exercise} sets={w.sets} weightKg={w.weightKg} />
        </div>

        <TrainingHistoryPanel entries={w.trainingHistory} />
      </div>
    </WorkoutLayout>
  );
}
