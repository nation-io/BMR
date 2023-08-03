import { Accordion } from '@/components/Accordion/Accordion';
import Button from '@/components/buttons/Button';

export const Faq = () => {
  const QUESTIONS = [
    {
      title: 'What does “double elimination” mean? ',
      description:
        ' Each entrant goes down the track once. The winner is decided based on who crosses the finish line fastest.',
    },
    {
      title: 'How many people can race?',
      description:
        'Et praesentium quisquam ut sapiente omnis sed rerum nobis aut odit enim vel quas aliquid ut rerum neque a deserunt beatae. Et incidunt deleniti non quisquam provident aut repellendus culpa ut officia consequatur et illo velit sit praesentium aliquid.',
    },
    {
      title: 'What do I get if I win?',
      description:
        'Et praesentium quisquam ut sapiente omnis sed rerum nobis aut odit enim vel quas aliquid ut rerum neque a deserunt beatae. Et incidunt deleniti non quisquam provident aut repellendus culpa ut officia consequatur et illo velit sit praesentium aliquid.',
    },
    {
      title: 'How is the prize money raised?',
      description:
        'Et praesentium quisquam ut sapiente omnis sed rerum nobis aut odit enim vel quas aliquid ut rerum neque a deserunt beatae. Et incidunt deleniti non quisquam provident aut repellendus culpa ut officia consequatur et illo velit sit praesentium aliquid.',
    },
  ];

  return (
    <div className='flex'>
      <div className='m-5 flex h-[850px] w-1/2 flex-col justify-between rounded-xl bg-black p-14'>
        <p className='text-7xl text-[164px] font-medium text-white'>FAQ</p>
        <div>
          <Button className='mt-14' variant='dark'>
            Get event updates
          </Button>
        </div>
      </div>
      <div className='flex w-1/2 flex-col justify-center'>
        {QUESTIONS.map((item, index) => {
          return (
            <Accordion
              key={index}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
};
