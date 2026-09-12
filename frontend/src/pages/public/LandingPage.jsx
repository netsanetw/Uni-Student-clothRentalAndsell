import React from 'react'
import { Link } from 'react-router-dom'
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  ShoppingBagIcon, 
  CheckCircleIcon,
  MagnifyingGlassIcon,
  TagIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const LandingPage = () => {
  const categories = [
    {
      name: 'Traditional & Cultural Wear',
      desc: 'Habesha dresses, cultural suits, and traditional ceremony attire.',
      icon: '✨',
      badge: 'Popular'
    },
    {
      name: 'Formal Wear & Suits',
      desc: "Men's suits, blazers, evening gowns, shirts, and trousers.",
      icon: '👔',
      badge: 'Rent & Buy'
    },
    {
      name: 'Ceremony & Graduation',
      desc: 'Graduation gowns, department event outfits, presentation wear.',
      icon: '🎓',
      badge: 'Official'
    },
    {
      name: 'Fashion Accessories',
      desc: 'Jewelry, shoes, bags, scarves, ties, watches, and bouquets.',
      icon: '💎',
      badge: 'Bundles'
    }
  ]

  const featuredProducts = [
    {
      id: 1,
      name: 'Habesha Traditional Graduation Ceremony Dress',
      category: 'Traditional & Cultural Wear',
      type: 'Rental & Sale',
      rentalPrice: '$35 / 3 days',
      salePrice: '$180 Purchase',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      vendor: 'Habesha Elegance Boutique'
    },
    {
      id: 2,
      name: "Men's Royal Navy Formal Suit & Tie Set",
      category: 'Formal Wear',
      type: 'Rental & Sale',
      rentalPrice: '$40 / 3 days',
      salePrice: '$210 Purchase',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
      vendor: 'Prestige Formalwear'
    },
    {
      id: 3,
      name: 'Complete Ceremony Bundle (Suit + Shoes + Watch)',
      category: 'Package Offers',
      type: 'Package Rental',
      rentalPrice: '$65 / 3 days',
      salePrice: '$320 Purchase',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      vendor: 'Campus Designer Hub'
    }
  ]

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-tertiary/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-secondary/20 border border-secondary/40 px-4 py-1.5 rounded-full text-xs font-semibold text-tertiary">
              <SparklesIcon className="w-4 h-4 text-tertiary" />
              <span>University Ceremony & Event Attire Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold leading-tight tracking-tight text-white">
              Rent or Buy Ceremony Outfits with <span className="text-tertiary underline decoration-secondary/50">Student Discounts</span>
            </h1>

            <p className="text-lg text-slate-300 font-body leading-relaxed max-w-xl">
              Connect with top local designers and boutique vendors for traditional cultural wear, formal suits, ceremony dresses, and accessories for university events.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/student/catalog"
                className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-2xl shadow-lg shadow-secondary/30 transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center space-x-2"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span>Explore Full Catalog</span>
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-2xl transition-all text-center"
              >
                Vendor Registration
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center space-x-6 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-tertiary" />
                <span>Verified Student Discounts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-tertiary" />
                <span>Rent or Purchase</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-tertiary" />
                <span>Designer Collections</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                alt="Traditional and Formal Wear"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent flex items-end p-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl w-full text-white">
                  <p className="text-xs uppercase tracking-wider text-tertiary font-bold">Traditional • Formal • Accessories</p>
                  <p className="text-base font-headline font-bold">Empowering Student Elegance for Every University Event</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-secondary">Browse By Category</span>
          <h2 className="text-3xl font-headline font-bold text-primary">Ceremony & Cultural Collections</h2>
          <p className="text-sm text-neutralCustom">Rent for a weekend or buy to keep forever.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to="/student/catalog"
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="font-headline text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutralCustom leading-relaxed">{cat.desc}</p>
              </div>
              <span className="text-xs font-bold text-secondary group-hover:underline inline-block pt-2">
                Explore Items &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-secondary">Available Now</span>
            <h2 className="text-3xl font-headline font-bold text-primary mt-1">Featured Outfits & Accessories</h2>
          </div>
          <Link
            to="/student/catalog"
            className="text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center space-x-1"
          >
            <span>View all products &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {item.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-tertiary text-primary text-xs font-bold px-3 py-1 rounded-full shadow">
                    {item.type}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-xs text-neutralCustom font-medium">{item.vendor}</div>
                  <h3 className="font-headline text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="text-sm font-bold text-secondary block">{item.rentalPrice}</span>
                  <span className="text-xs text-slate-500 font-medium block">{item.salePrice}</span>
                </div>
                <Link
                  to="/student/catalog"
                  className="px-4 py-2 bg-primary/10 hover:bg-secondary text-primary hover:text-white font-semibold text-xs rounded-xl transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default LandingPage
