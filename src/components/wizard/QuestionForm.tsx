'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import type { Question, Answers } from '@/types';

interface QuestionFormProps {
  questions: Question[];
  initialAnswers: Answers;
  onSubmit: (answers: Answers) => void;
  onBack: () => void;
}

export default function QuestionForm({ questions, initialAnswers, onSubmit, onBack }: QuestionFormProps) {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isValid = questions
    .filter((q) => q.required)
    .every((q) => answers[q.id]?.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(answers);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {questions.map((question, index) => (
        <div key={question.id} className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
            <span className="text-gold-500 text-xs font-bold">Q{index + 1}</span>
            {question.label}
            {question.required && <span className="text-gold-500">*</span>}
          </label>

          {question.type === 'text' ? (
            <Input
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              required={question.required}
            />
          ) : (
            <Textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              required={question.required}
              maxLength={question.maxLength}
              showCount={!!question.maxLength}
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onBack}>
          이전으로
        </Button>
        <Button type="submit" variant="primary" disabled={!isValid} className="flex-1">
          컨셉 생성하기
        </Button>
      </div>
    </form>
  );
}
