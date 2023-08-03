import client from '@sendgrid/client';
import React, { useState } from 'react';
import { Element } from 'react-scroll';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Button from '@/components/buttons/Button';

import Notification from '@/../public/images/icons/notification.svg';

const sendgridApiKey: string = process.env.NEXT_PUBLIC_SENDGRID_API_KEY ?? '';
client.setApiKey(sendgridApiKey);

export const SubscribeEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [disable, setDisable] = useState(true);
  const MySwal = withReactContent(Swal);

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidEmail(event.target.value)) {
      setError('Email is invalid');
      setDisable(true);
    } else {
      setError('');
      setDisable(false);
    }
    setEmail(event.target.value);
  };

  const handleSendSubscription = async () => {
    const data = {
      list_ids: ['6857032f-a6a3-4391-aa12-e4079f3b9f16'],
      contacts: [
        {
          email: email,
        },
      ],
    };

    const request = {
      url: `/v3/marketing/contacts`,
      method: 'PUT' as const,
      body: data,
    };

    client
      .request(request)
      .then(async () => {
        await MySwal.fire({
          icon: 'success',
          title: 'You are already subscribed',
          showConfirmButton: false,
          timer: 1500,
        });

        const emailData = {
          to: email,
          subject: 'Race subscription confirmed',
          message: 'You are already subscribed to Race',
        };

        await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  return (
    <Element
      name='subscribe'
      className='relative flex w-full justify-center bg-black px-5 text-white'
    >
      <div className='lg:min-w-[800px]'>
        <div className='my-16 lg:my-24'>
          <h3 className='text-4xl font-medium tracking-tight lg:text-7xl'>
            Sign up to stay
            <br />
            updated on the rally.
          </h3>
          <div className='mt-5 flex w-full justify-between rounded-lg bg-white p-3 md:mt-14 md:rounded-xl'>
            <div className='flex flex-col'>
              <input
                value={email}
                onChange={handleChange}
                className='border-0 text-black outline-0 focus:!ring-0 lg:w-[400px]'
                type='email'
                placeholder='Email address'
              />
            </div>
            <Button
              variant='dark'
              disabled={disable}
              onClick={() => {
                handleSendSubscription();
              }}
            >
              <Notification />
              <span className='ml-1'>Submit</span>
            </Button>
          </div>
          {error && <p className='pt-3 text-base text-red-600'>{error}</p>}
        </div>
      </div>
    </Element>
  );
};
