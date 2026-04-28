'use client';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';

const PD = "Playfair Display, Georgia, serif";

export default function CartPage() {
  const router = useRouter();
  const { items, totalItems, updateQuantity, removeItem, clearCart } = useCart();

  const totalPrice = items.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[₹,]/g, ''));
    return sum + num * item.quantity;
  }, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8EC', fontFamily: PD }}>
      <Nav />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 5vw 80px', minHeight: '60vh' }}>
        <h1 style={{
          fontFamily: PD, fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: '700', color: '#2C1810', letterSpacing: '-0.02em', marginBottom: '8px',
        }}>
          Shopping Cart
        </h1>
        <p style={{ fontFamily: PD, fontSize: '13px', color: '#9B8B7A', marginBottom: '40px' }}>
          {totalItems === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`}
        </p>

        {items.length === 0 ? (
          <>
            <div style={{
              background: 'rgba(214,232,245,0.3)', borderRadius: '20px',
              padding: '60px', textAlign: 'center', marginBottom: '40px',
              border: '1px dashed rgba(44,24,16,0.1)',
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }}>🎓</div>
              <p style={{ fontFamily: PD, fontSize: '15px', fontStyle: 'italic', color: '#9B8B7A', lineHeight: '1.6' }}>
                Your cart is empty — but your future doesn&apos;t have to be.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={() => router.push('/')}
                style={{ padding: '14px 36px', background: 'transparent', color: '#2C1810', border: '2px solid #2C1810', borderRadius: '100px', fontFamily: PD, fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2C1810'; e.currentTarget.style.color = '#FFF8EC'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2C1810'; }}>
                Continue Shopping
              </button>
              <button onClick={() => router.push('/#services')}
                style={{ padding: '14px 36px', background: '#F5A623', color: '#2C1810', border: 'none', borderRadius: '100px', fontFamily: PD, fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                View our packages ✦
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Cart items */}
            <div style={{ marginBottom: '32px' }}>
              {items.map(item => (
                <div key={item.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 24px', background: 'white', borderRadius: '16px',
                  marginBottom: '12px', boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: PD, fontSize: '16px', fontWeight: '700', color: '#2C1810', marginBottom: '4px' }}>{item.name}</p>
                    <p style={{ fontFamily: PD, fontSize: '14px', color: '#9B8B7A' }}>{item.price} × {item.quantity}</p>
                  </div>

                  {/* Quantity controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '24px' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1.5px solid rgba(44,24,16,0.2)', background: 'transparent', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      −
                    </button>
                    <span style={{ fontFamily: PD, fontSize: '16px', fontWeight: '700', color: '#2C1810', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1.5px solid rgba(44,24,16,0.2)', background: 'transparent', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      +
                    </button>
                  </div>

                  <button onClick={() => removeItem(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B8B7A', fontSize: '18px' }}>×</button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{
              padding: '24px', background: 'white', borderRadius: '16px',
              boxShadow: '0 2px 12px rgba(44,24,16,0.06)', marginBottom: '24px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: PD, fontSize: '18px', fontWeight: '700', color: '#2C1810' }}>Total</span>
              <span style={{ fontFamily: PD, fontSize: '24px', fontWeight: '700', color: '#2C1810' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={() => router.push('/')}
                style={{ padding: '14px 36px', background: 'transparent', color: '#2C1810', border: '2px solid #2C1810', borderRadius: '100px', fontFamily: PD, fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                Continue Shopping
              </button>
              {/* Payment gateway button — link to be added */}
              <button
                style={{ padding: '14px 48px', background: '#2C1810', color: '#FFF8EC', border: 'none', borderRadius: '100px', fontFamily: PD, fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#E8713A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#2C1810')}>
                Proceed to Payment →
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
