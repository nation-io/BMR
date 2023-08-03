import { useMemo } from "react";

import { GetPollResponse } from "@/utils/apiCalls";

export type PollProps = {
  poll: NonNullable<GetPollResponse["poll"]>;
  choice: number | null;
  setChoice: (choiceId: number) => void;
};

export const Poll = ({ poll, choice: pollChoice, setChoice }: PollProps) => {
  const choices = useMemo(() => {
    return poll.voting_polls_choices.map(
      ({ id, choice, voting_polls_voters }) => {
        return { id, choice, votes: voting_polls_voters[0].count };
      },
    );
  }, [poll]);

  return (
    <div className="">
      {choices.map(({ id, choice, votes }) => {
        return (
          <div
            key={`choice-${id}`}
            className="mt-[1rem] mb-[1rem] min-h-[1.5rem]"
          >
            <input
              className="relative accent-color-black float-left mt-[4px] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] bg-transparent border-solid border-neutral-600 outline-none checked:bg-black checked:focus:bg-black focus:ring-transparent"
              type="checkbox"
              checked={pollChoice ? id === pollChoice : false}
              value={id}
              id={`${id}`}
              disabled={pollChoice ? pollChoice !== Number(id) : false}
              onChange={() => null}
              onClick={() => setChoice(id)}
            />
            <label
              className="flex pl-[0.15rem] hover:cursor-pointer justify-between"
              htmlFor={`${id}`}
            >
              <span className="text-xl font-medium">
                {choice}
              </span>
              <span className="text-xl font-light">
                {votes} vote{votes !== 1 && "s"}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
};
