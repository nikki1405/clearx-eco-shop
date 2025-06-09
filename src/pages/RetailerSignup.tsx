
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Layout from '@/components/Layout';

const RetailerSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    storeAddress: '',
    storePhone: '',
    openingTime: '',
    closingTime: '',
    productTypes: [],
    storePhotos: [],
    verificationDoc: null
  });

  const businessTypes = [
    'Grocery Store', 'Bakery', 'Restaurant', 'Cafe', 'Supermarket', 
    'Fashion Store', 'Electronics Store', 'Pharmacy', 'Other'
  ];

  const productTypeOptions = [
    'Fresh Produce', 'Bakery Items', 'Dairy Products', 'Meat & Seafood',
    'Packaged Foods', 'Beverages', 'Fashion', 'Electronics'
  ];

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 'medium', color: 'bg-yellow-500' };
    return { strength: 'strong', color: 'bg-green-500' };
  };

  const handleSubmit = () => {
    // In a real app, this would make an API call
    console.log('Retailer signup completed:', formData);
    navigate('/login');
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <Layout>
      <div className="min-h-screen bg-eco-lightest py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-eco-green h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Join as Retailer</CardTitle>
              <CardDescription>
                {currentStep === 1 && "Let's start with your business information"}
                {currentStep === 2 && "Tell us about your store"}
                {currentStep === 3 && "Upload verification documents"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Business Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      placeholder="Enter your business name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <select
                      id="businessType"
                      className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md"
                      value={formData.businessType}
                      onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Create a strong password"
                    />
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${getPasswordStrength(formData.password).color} transition-all duration-300`} 
                                 style={{ width: formData.password.length < 6 ? '33%' : formData.password.length < 10 ? '66%' : '100%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600 capitalize">{getPasswordStrength(formData.password).strength}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm your password"
                    />
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Store Info */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Input
                      id="storeAddress"
                      value={formData.storeAddress}
                      onChange={(e) => setFormData({...formData, storeAddress: e.target.value})}
                      placeholder="Complete store address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="storePhone">Store Phone</Label>
                    <Input
                      id="storePhone"
                      value={formData.storePhone}
                      onChange={(e) => setFormData({...formData, storePhone: e.target.value})}
                      placeholder="Store contact number"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="openingTime">Opening Time</Label>
                      <Input
                        id="openingTime"
                        type="time"
                        value={formData.openingTime}
                        onChange={(e) => setFormData({...formData, openingTime: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="closingTime">Closing Time</Label>
                      <Input
                        id="closingTime"
                        type="time"
                        value={formData.closingTime}
                        onChange={(e) => setFormData({...formData, closingTime: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Product Types</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {productTypeOptions.map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={formData.productTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({...formData, productTypes: [...formData.productTypes, type]});
                              } else {
                                setFormData({...formData, productTypes: formData.productTypes.filter(t => t !== type)});
                              }
                            }}
                          />
                          <Label htmlFor={type} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Store Photos</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="text-gray-500">
                        <p>Drag and drop photos here, or</p>
                        <Button variant="outline" className="mt-2">Browse Files</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Verification */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label>Business License / Verification Document</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="text-gray-500">
                        <p>Upload your business license or registration document</p>
                        <Button variant="outline" className="mt-2">Choose Document</Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Required Documents:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Business Registration Certificate</li>
                      <li>• GST Registration (if applicable)</li>
                      <li>• Trade License</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <Button onClick={nextStep} className="bg-eco-green hover:bg-eco-dark">
                      Next Step
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-eco-green hover:bg-eco-dark">
                      Complete Registration
                    </Button>
                  )}
                </div>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-eco-green hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RetailerSignup;
