import Head from 'next/head';
import * as React from 'react';

const B =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPUSURBVHgB7Z3hTWpBEIWHl1eAVqBWoHagFagVqBUoFQAVABVAB0AFQAVABVACVHDfPeBNCNH7Ijswc3fPl2z4aeTL7uzOziw1EcmEuOGPEFdQiDMoxBkU4oy/YsT19fV2hLJer7djtVpJLGQWo9/vZ9rMZrNsMBhkn5+f2d3dncn/pTBs/vAphByyXC6zTqeT5TPRy5edtpB9xuNx9vDw4OVL/3EkE9RzGZJL2Q6N2HUqkttlQUy+lEmj0RCPJLvtbTabkm8C3M2WpM8h+U7M3RKW/MEQMjxJ4UlddlLy84tcXFyINRTyBZYvD4GeQvbIT/jbXZglFHJAu90WSyorpEgoaicVsXS9vb2JFZUVMp/P5ebmZjtqtZq8v7+ryXl9fRUrolmy8tyYPD4+qkhBHLHaBkcVQyADUrCchfL8/CwWRBfUIaXb7UooT09PYkGUu6z8DkRCQXC3IEohGle6OLVbxJFozyGLxUJCsUilRCtEI7BTiDO4ZBEKKcOi1otCnEEhJXCGOINCHIFssgUU8gMU4ozRaCQWRCvk6upKjgWxYzgcigXRCgnJ1k4mE7EiSiG48QvJQ7VaLbEiSiEhRQq4CrbsxopOyMfHx9FFChBhOTtAVEIgAlXtx1Kv1817Fc2aPkMpbvTwiQAOGSFVh5gZVjurQ0xat87d0lZGPqvMW9mKUdkZogWWKY2iCC2SFYJYgWpHyzPHdySZOkHd1v39vTsZIKkZAgEI3h5FFCQj5OXlxc0uqoxklixsiz33pxckIwTF0+hP7/V6fDjAE8hzFWI8NHkekuwFFcTw4QBnQAakWHZMHZL8FS6WLaTcvUipfNOnRlE1gBTrlmhQ+abPy8vL7adG0ydec7COKVEsWRBRNH2GlO9g+cLuy5Iomz5DpGDZYp+6IogpSKmHYPnmSZS7LCQPQxKIiCNWAT7abW9o5aHVLIlWSGhtLu7p2WOoiEZbtEWvOrtwS6AQRTSE3N7eyrlhO0IJyAKcGwopIaSl4VgopATusgiFeCNaIRrLjdZdy2+gkBIoRBGNi6bNZiPnJlohGtlai171aIVoFC1QiBK48dNYsihEAYjQuMuADD4+E4jmj7NMp1OxoPJNnwCfKKZGS7QWVm1ulRWCuwoUTZ8Cy8cDmDr5Bj6t4Qg+reEIPq3hDM0fhTkWCvnCS3cuhchORsijNZrwaQ0+reEDr09rJCcEl054WgOzwuIC6n8kI8S7iIKoheCLR9YWlfA48HkWURCFEHzRxYAA/NwRPjGqIGGfmuxeMiNO4DnEGRTiDApxBoU4g0KcQSHO+AewjFzqqJqXDQAAAABJRU5ErkJggg==';
const M =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN2SURBVHgB7ZztjeIwEIaH0/2HDqADKIEOaIESKIES6CCUQAt0AB1AB1ABp4kUyYqyXGyPk/fNziNF9+d2tZqH+bBNPBORjzgw/BEHChcChgsBw4WA8VcKs1qt6ieXx+NRPyksFgvZbDaSy+v1ktvtJqX5lHzO5/PHgsPhkPw3HI/HjwVVVRWNlT40JWu9XksqFtkxFDRCcoI6n8+FBRohOX3IM6QA2pj1GernxoJq7E3JEqbsUKiEpATXhRQkJbgWa6AhoRKSMi3ljMtjQCVku91KLEwNXaESkhJc7yEFUSExPYFNhkK32xsTZLaGrtAJiQmyCxkAL1lgxAhZLpfCBp2QmHWFZ8gAaIb0GX/ZNhUbKM/U+5QtxuxQKIX0CTZjdiieIWBQCukzPbmQAekTbMaRV/GSBQalkP9tMrLKUGi/SvptimKdsBRaId+ywDNkBL4FnXGXt4FWyLegs52jh9AK+RZ07yEj4FMWIF1SmGUo1EK6gs/c0BXPEDCohXQ1dhcyIl3BZ3o5pwtqIV3jrWfIiLTP11nP0UPo31MPGzt7dij0QkIJ7COv4hkCBr2Q8KjWMwSAMCtYz9FDvGSBUfzymdI05+vs427DJK5n0syYihDIDLnf7/W/fU/+drudzGYz6cv1eq0FIp4sQgq5XC713VhVVfX6//v9XmI4nU51ViEKgS1ZJS8KS70IbQhghZQM2hC3wqUCK0Sv0yshpZGBuoiEFNIs8JrmbomKRgZ67C0RvBKSLYEWUqLWIzd0BVpIyR6CupD8dRnSlEHUs3dIIc0EVDJDUIHfy7KUgi5DgRdiORU9n09B59dmiDf1CMJVtGWZCeW6kEQsF4foaxAFXohlhnhTN0A/1RZZor8DfR9LoTjCtSg17ezw3d4I2sGyGH3f77cwQJEhFqWGoX8oFEIsgulCDLEIJsMaRIEVEgbNoqm7kEzCoOWOrCwjr0LzzcWcLGHpHwqNkJzRF/0cPYRGSM6nvJ1dyO+RUPQQJacHeMkyoC0kJ6gsDV3xpg4GjZDUr5YyyVBoSpaSMi11lStv6gl0CUnJEKaRV6F6pS1FCMOxbcjkhXgPKUhKcLsk+uZiAhY95KfJzIUk8FPQYqSw9Q+F7j31mKmJ4aujbeiExHzq2Rq6om/bf8SBYRJXa0wJFwKGCwHDhYDhQsBwIWD8A5XN+puQ7b8AAAAAAElFTkSuQmCC';
const R =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOKSURBVHgB7ZzRkWlBEIZ7b913RIAIyAAZyAAZEAEiEAIiIANEgAiQgQzO9bt7qra2WPeeHtU9Pf1VndrHrd2vZv7pmZ75IKKMHDX8IkcVLkQZLkQZLkQZv0mIWq12/0JwPp/vnxUyiW8ymWSh2e/32Wq1yvr9fnaTLfJ3BfhkfvE7hHxns9nc5Sj4J//zZzpD2u02zedzOp1OdBNDMZBEqCOrcjGhcutdJLXKggxIGY/HpJUkl723/FIrJdk6BFIwjWkj6cIQQa9tpCRfqWOkDIdD0oJvndzAKNGy+nIhN8rlspo8cSGfoIjsdrskTbRCrtfrfUMRP0Mxm81ImmiFHA4HqtfrVKlU7j+XyyVxQY5Ib7GYmLIwUvCP7HQ67BHT6/VIElMZst1uaTAYEAdkieSKy1yor9dr9vQlOW2ZXGUtFgvi0Gq1SAqTQjB1cbKk2WzeaxMJzNYhu92OigIZUjliVgh3tYVRIoFZIdwuFB8hyqhWqySBC3kCdgAkcCFPKJVKJIELUYYLUYYLUYYLUYYLUYYLeYLU9QYX8oTL5UISuJAn+AhRhgsJDHdzEE0UEpgVwjlggoyQ7UX/g1khjUaDisI53OJiUgj3hi8aJaQwKQQd7UVBmONMXgpzQnD0yml2m06nJIkpIZCxWq2oKNKjA5gQghUV7nhsNhtWdqDBTvpFCLGnNbhgNEAAZIToEIEITvaEIlohEIE+3FBwe4JD4Vsn9DfIpbMjJ3khWqaqnKSFQAbulGgiWSHYq4IMbe9sJSlEqwyQpBDsVUltr78iSSEhl8uhSVIIqnmpCzmvSDbUpe5/vCJZIVqnrWiFYJU0Go2oKJIXO38iWiFYsnJu2/qU9Qby906KIHmx8yeiz5Dj8UhF0Zgj0QvhVNsacyR6IZyK20dIQPLCjnOOobFAjF4I9xEzbastE4UhZ9rS8KzfV0wI4ay0OC2n7yD5EeJTViC+hjFHSKg2olAkLwRoWv6a2e3lSNGUI2aEWNlC8RFCugpEF/KJllESrZDvW+cuRBmcsxGgJdhNnalzLmtqqUVMCbFQIJoSwm0N1ZAjJir1HO4dDw05Eq2QR49UItg5ZyM+Qt4AJ9g1FIjmhMSeI+aExF4gmhMSe7Cb2TrJib3pwWT3e8wFokkhnLMRIJkjPkIeIJkjLuQBkl3xH7cvI0cNyV5p04oLUYYLUYYLUYYLUYYLUcYfZ9eJ0WAiL/8AAAAASUVORK5CYII=';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [faviconIndex, setFaviconIndex] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timer>();

  // Put Header or Footer Here
  const data = {
    title: 'The Bear Market Rally',
    description:
      'The Bear Market Rally is a go-kart grand prix with the best builders in web3 during Breakpoint 2022.',
    canonical: 'https://thebearmarketrally.com',
    ogImage: {
      url: 'https://thebearmarketrally.com/share.png',
      alt: 'https://race-zeta.vercel.app/share.png',
      width: 1920,
      height: 1080,
    },
    twitter: {
      cardType: 'summary_large_image',
      handle: 'buildwithnation',
      site: 'https://nation.io',
    },
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      intervalRef.current = setInterval(() => {
        setFaviconIndex((i) => (i == 2 ? 0 : i + 1));
      }, 1000);

      return () => clearInterval(intervalRef.current as number | undefined);
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          key='viewport'
          content='width=device-width, height=device-height, initial-scale=1, shrink-to-fit=no'
        />

        <link rel='shortcut icon' href='/favicon.png' type='image/png' />
        <link rel='icon' href={[B, M, R][faviconIndex]} type='image/png' />
        <link rel='apple-touch-icon' href='/favicon.png' />
        <link rel='manifest' href='/manifest.webmanifest' />

        <title>{data.title}</title>
        <meta name='description' content={data.description} />
        <meta name='twitter:card' content={data.twitter.cardType} />
        <meta name='twitter:site' content={data.twitter.site} />
        <meta name='twitter:creator' content={data.twitter.site} />
        <meta name='twitter:title' content={data.title} />
        <meta name='twitter:description' content={data.description} />
        <meta name='twitter:image' content={data.ogImage.url} />
        <meta property='og:title' content={data.title} />
        <meta property='og:description' content={data.description} />
        <meta property='og:url' content={data.canonical} />
        <meta property='og:image' content={data.ogImage.url} />
        <meta property='og:image:alt' content={data.ogImage.alt} />
        <meta property='og:image:width' content={data.ogImage.width + ''} />
        <meta property='og:image:height' content={data.ogImage.height + ''} />
        <link rel='canonical' href={data.canonical} />
      </Head>
      {children}
    </>
  );
}
