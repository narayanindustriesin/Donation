import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="card">
        <h1>About Narayan Foundation</h1>
        <p>
          Narayan Foundation works under the campaign <strong>Vision United World</strong> to build stronger
          communities through education, healthcare access, women empowerment, and climate resilience.
        </p>

        <h2>Vision</h2>
        <p>
          A world where every family has equal opportunity to learn, stay healthy, and live with dignity.
        </p>

        <h2>Impact</h2>
        <ul>
          <li>10,000+ meals distributed in underserved communities.</li>
          <li>2,000+ students supported with school learning kits.</li>
          <li>120+ community health outreach events delivered.</li>
        </ul>

        <Link href="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Back to Donation
        </Link>
      </div>
    </main>
  );
}
