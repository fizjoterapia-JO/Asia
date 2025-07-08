import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 20000 })
    });

    const { clientSecret } = await res.json();

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Płatność zakończona sukcesem!');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-6">
      <CardElement options={{ hidePostalCode: true }} className="p-4 border rounded-md" />
      <button type="submit" disabled={!stripe || loading} className="bg-blue-500 text-white py-2 rounded-md">
        {loading ? 'Przetwarzanie...' : 'Zapłać'}
      </button>
      {message && <p className="text-green-600 text-center mt-2">{message}</p>}
    </form>
  );
}

const Map = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.8395323695585!2d20.9067242!3d52.291244999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecb5f2dcbf191%3A0x57a24d9f1fb75028!2sW%C3%B3lczy%C5%84ska%20300E%2C%2001-919%20Warszawa!5e0!3m2!1spl!2spl!4v1720435387000!5m2!1spl!2spl"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default function Home() {
  return (
    <div className="bg-white text-gray-800 p-6">
      <div className="flex flex-col items-center">
        <Image src="/logo.jpeg" alt="Logo fizJOterapia" width={300} height={300} className="my-4" />
        <h1 className="text-3xl font-bold text-center">fizJOterapia Joanna Olenderek</h1>
      </div>

      <section className="my-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">O mnie</h2>
        <p className="max-w-xl mx-auto">Jestem dyplomowaną fizjoterapeutką z wieloletnim doświadczeniem. Specjalizuję się w terapii manualnej, fizjoterapii ortopedycznej i kinesiotapingu. Zapraszam na indywidualne podejście i skuteczną terapię.</p>
        <div className="flex justify-center mt-4">
          <Image src="/your-photo.jpg" alt="Joanna Olenderek" width={200} height={200} className="rounded-full shadow-lg" />
        </div>
      </section>

      <section className="my-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Usługi</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Terapia manualna</h3>
            <p className="text-gray-600">Cena: 200 zł</p>
          </div>
          <div className="border p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Fizjoterapia ortopedyczna</h3>
            <p className="text-gray-600">Cena: 200 zł</p>
          </div>
          <div className="border p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Kinesiotaping</h3>
            <p className="text-gray-600">Cena: 60 zł</p>
          </div>
        </div>
      </section>

      <section className="my-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Rezerwacja online</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </section>

      <section className="my-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
        <p>Mail: <a href="mailto:fizjoterapia.jo@gmail.com" className="text-blue-500">fizjoterapia.jo@gmail.com</a></p>
        <p>Telefon: <a href="tel:512384325" className="text-blue-500">512-384-325</a></p>
        <p>Adres: ul. Wólczyńska 300 E, 01-919 Warszawa</p>
      </section>

      <section className="my-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Znajdź nas</h2>
        <Map />
      </section>
    </div>
  );
}