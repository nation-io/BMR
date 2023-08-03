import moment from 'moment';
import { useEffect, useState } from 'react';

export const Countdown = () => {
  const [seconds, setSeconds] = useState('');
  const [minutes, setMinutes] = useState('');
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');

  const verifyTime = () => {
    const today = moment(new Date());
    const target = moment(new Date('2022-11-06 15:30:00'));

    const duration = moment.duration(target.diff(today));

    //Get Days and subtract from duration
    const days = Math.floor(duration.asDays());
    duration.subtract(moment.duration(days, 'days'));

    //Get hours and subtract from duration
    const hours = duration.hours();
    duration.subtract(moment.duration(hours, 'hours'));

    //Get Minutes and subtract from duration
    const minutes = duration.minutes();
    duration.subtract(moment.duration(minutes, 'minutes'));

    //Get seconds
    const seconds = duration.seconds();

    setDays(Math.abs(days).toString());
    setHours(hours.toString());
    setMinutes(minutes.toString());
    setSeconds(seconds.toString());
  };

  useEffect(() => {
    const interval = setInterval(verifyTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className='text-xs font-medium leading-none tracking-[-0.01em] text-white'>
        RACE BEGINS IN:
      </p>
      <div className='flex gap-2'>
        {Object.entries({ days, hours, minutes, seconds }).map(
          ([label, value]) => (
            <div
              className='flex flex-col items-center justify-center'
              key={label}
            >
              <h3 className='font-screamer text-5xl font-normal leading-[1.18] text-white lg:text-7xl'>
                {value.length == 1 ? `0${value}` : value}
              </h3>
              <p className='mt-2 text-xs font-medium leading-none tracking-[-0.01em] text-white'>
                {label.toUpperCase()}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
