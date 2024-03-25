export interface QuizItem {
    id: number;
    question: string,
    answers: Array<string>;
    correctAnswerIndex: number;
}
