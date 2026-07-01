export const basePrice = 28000

export const bodyColorOptions = [
    { value: 'red', label: 'Redline', hex: '#c0392b' },
    { value: 'blue', label: 'Bluewave', hex: '#3d6df6' },
    { value: 'black', label: 'Midnight', hex: '#202225' },
    { value: 'silver', label: 'Silvermist', hex: '#adb5bd' },
    { value: 'white', label: 'Polar', hex: '#f8f9fa' },
    { value: 'yellow', label: 'Sunburst', hex: '#f1c40f' }
]

export const wheelOptions = [
    { value: 'standard', label: 'Standard', price: 0 },
    { value: 'sport', label: 'Sport', price: 1200 },
    { value: 'chrome', label: 'Chrome', price: 1800 },
    { value: 'offroad', label: 'Off-road', price: 1600 },
    { value: 'aero', label: 'Aero', price: 1400 }
]

export const interiorOptions = [
    { value: 'cloth', label: 'Cloth', price: 0 },
    { value: 'leather', label: 'Leather', price: 1500 },
    { value: 'suede', label: 'Suede', price: 2200 },
    { value: 'carbon', label: 'Carbon', price: 2600 }
]

export const packageOptions = [
    { value: 'city', label: 'City', price: 0 },
    { value: 'touring', label: 'Touring', price: 2400 },
    { value: 'adventure', label: 'Adventure', price: 3200 },
    { value: 'track', label: 'Track', price: 4100 }
]

export const spoilerOptions = [
    { value: 'none', label: 'None', price: 0 },
    { value: 'lip', label: 'Lip', price: 500 },
    { value: 'wing', label: 'Wing', price: 1100 }
]

const priceLookup = (options, value) => options.find((option) => option.value === value)?.price ?? 0

export const getCarPrice = (car) => {
    return basePrice
        + priceLookup(wheelOptions, car.wheel_style)
        + priceLookup(interiorOptions, car.interior)
        + priceLookup(packageOptions, car.package)
        + priceLookup(spoilerOptions, car.spoiler)
}

export const getColorHex = (colorValue) => bodyColorOptions.find((option) => option.value === colorValue)?.hex ?? '#adb5bd'

export const getColorLabel = (colorValue) => bodyColorOptions.find((option) => option.value === colorValue)?.label ?? 'Silvermist'

export const getOptionLabel = (options, value) => options.find((option) => option.value === value)?.label ?? value

export const getErrorMessage = (car) => {
    if (car.package === 'track' && car.wheel_style === 'offroad') {
        return 'Track package cannot be paired with off-road wheels.'
    }

    if (car.package === 'adventure' && car.spoiler === 'wing') {
        return 'Adventure package cannot be paired with a wing spoiler.'
    }

    return ''
}

export const createPreviewStyle = (car) => ({
    '--car-body': getColorHex(car.body_color),
    '--car-glow': getColorHex(car.body_color),
    '--car-accent': car.interior === 'carbon' ? '#111827' : '#f8fafc'
})