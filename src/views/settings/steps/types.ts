export interface StepProps<T> {
  step: T;
  onChange: (step: T) => void;
}
