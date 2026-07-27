import React, { useState, useEffect } from 'react';
import { LEGAL_QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle, ArrowRight, ShieldCheck, Sparkles, Volume2, Square } from 'lucide-react';

export function LegalQuiz() {
  const [questions] = useState<QuizQuestion[]>(LEGAL_QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<{ questionId: string; isCorrect: boolean }[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    if (speakingId === 'explanation') {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingId('explanation');
    }
  };

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    setIsAnswerSubmitted(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setAnswersHistory(prev => [...prev, { questionId: currentQuestion.id, isCorrect }]);
  };

  const handleNextQuestion = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnswersHistory([]);
    setIsQuizCompleted(false);
  };

  const getScoreRating = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { title: 'Legal Master & Guardian', color: 'text-amber-400', desc: 'Flawless score! You have comprehensive knowledge of women safety laws in India.' };
    if (percentage >= 75) return { title: 'Well-Informed Advocate', color: 'text-emerald-400', desc: 'Great job! You have strong awareness of critical legal rights, POSH rules, and emergency channels.' };
    if (percentage >= 50) return { title: 'Safety Awareness Practitioner', color: 'text-blue-400', desc: 'Good effort! You understand foundational legal concepts, but reviewing key BNS sections will strengthen your knowledge.' };
    return { title: 'Legal Awareness Learner', color: 'text-amber-200', desc: 'Keep learning! Explore our Laws Library and Legal Dictionary to boost your knowledge of your rights.' };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 p-4 md:p-8">
      {/* Header */}
      <div className="border-b border-white/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-2">Interactive Assessment</span>
          <h2 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight">Legal Awareness Quiz</h2>
        </div>
        {!isQuizCompleted && (
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 bg-white/5 px-3 py-1.5 border border-white/10 self-start md:self-auto">
            <HelpCircle className="w-4 h-4 text-[#c9a24b]" />
            <span>Question {currentIndex + 1} of {questions.length}</span>
          </div>
        )}
      </div>

      {!isQuizCompleted ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              className="bg-[#c9a24b] h-full transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#0c1729]/80 border border-[#c9a24b]/20 p-6 md:p-8 rounded-xl relative space-y-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#c9a24b] font-mono border border-[#c9a24b]/30 px-2.5 py-1 rounded">
                {currentQuestion.category}
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">
                Score: {score}/{currentIndex + (isAnswerSubmitted ? 1 : 0)}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-serif text-white leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;
                
                let optionStyle = "border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10";
                
                if (isAnswerSubmitted) {
                  if (isCorrectAnswer) {
                    optionStyle = "border-emerald-500/80 bg-emerald-950/40 text-emerald-200 font-medium";
                  } else if (isSelected && !isCorrectAnswer) {
                    optionStyle = "border-red-500/80 bg-red-950/40 text-red-200";
                  } else {
                    optionStyle = "border-white/5 bg-white/5 text-white/30 opacity-60";
                  }
                } else if (isSelected) {
                  optionStyle = "border-[#c9a24b] bg-[#c9a24b]/15 text-white font-medium";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-4 rounded-lg border text-sm transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono opacity-50 mt-0.5">{String.fromCharCode(65 + idx)}.</span>
                      <span>{option}</span>
                    </div>
                    {isAnswerSubmitted && isCorrectAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submit & Next Controls */}
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`w-full py-3.5 px-6 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedOption !== null 
                    ? 'bg-[#c9a24b] hover:bg-[#d8b35c] text-black shadow-lg shadow-[#c9a24b]/20 cursor-pointer' 
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 border-t border-white/10 pt-5 mt-4"
              >
                <div className={`p-4 rounded-lg border relative ${
                  selectedOption === currentQuestion.correctAnswerIndex 
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
                    : 'bg-red-950/30 border-red-500/30 text-red-200'
                }`}>
                  <button
                    onClick={() => toggleSpeech(currentQuestion.explanation)}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                    title={speakingId === 'explanation' ? "Stop reading" : "Read aloud"}
                  >
                    {speakingId === 'explanation' ? (
                      <Square className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 font-bold pr-8">
                    {selectedOption === currentQuestion.correctAnswerIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Correct Answer!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>Incorrect</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-white/90">
                    {currentQuestion.explanation}
                  </p>
                  <div className="mt-3 text-xs font-mono text-[#c9a24b] uppercase tracking-wider">
                    Law Provision: {currentQuestion.relevantLaw}
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 px-6 rounded-lg bg-white hover:bg-white/90 text-black font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>{currentIndex + 1 === questions.length ? 'View Final Score' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      ) : (
        /* Final Score Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0c1729] border border-[#c9a24b]/40 p-8 md:p-10 rounded-2xl text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#c9a24b]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex p-4 rounded-full bg-[#c9a24b]/15 text-[#c9a24b] mb-2">
            <Award className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c9a24b] font-mono block">Assessment Results</span>
            <h3 className={`text-2xl md:text-3xl font-serif ${getScoreRating().color}`}>
              {getScoreRating().title}
            </h3>
            <p className="text-sm text-white/70 max-w-lg mx-auto">
              {getScoreRating().desc}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl max-w-sm mx-auto flex items-center justify-around">
            <div>
              <span className="text-3xl font-serif text-white block font-bold">{score} / {questions.length}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Correct Answers</span>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <span className="text-3xl font-serif text-[#c9a24b] block font-bold">
                {Math.round((score / questions.length) * 100)}%
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Accuracy</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
