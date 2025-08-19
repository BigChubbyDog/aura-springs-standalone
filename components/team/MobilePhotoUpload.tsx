'use client';

import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface PhotoItem {
  file: File;
  preview: string;
  description: string;
  location: string;
}

interface MobilePhotoUploadProps {
  bookingId: string;
  clientId: string;
  serviceDate: string;
  serviceType: string;
  teamMember: string;
  location: string;
  onUploadComplete?: (result: any) => void;
}

export default function MobilePhotoUpload({
  bookingId,
  clientId,
  serviceDate,
  serviceType,
  teamMember,
  location,
  onUploadComplete
}: MobilePhotoUploadProps) {
  const [beforePhotos, setBeforePhotos] = useState<PhotoItem[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<PhotoItem[]>([]);
  const [teamReport, setTeamReport] = useState('');
  const [customerSatisfaction, setCustomerSatisfaction] = useState<number | undefined>();
  const [duration, setDuration] = useState(120);
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const beforeFileInputRef = useRef<HTMLInputElement>(null);
  const afterFileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (files: FileList | null, type: 'before' | 'after') => {
    if (!files) return;

    const newPhotos: PhotoItem[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        newPhotos.push({
          file,
          preview,
          description: '',
          location: location
        });
      }
    }

    if (type === 'before') {
      setBeforePhotos(prev => [...prev, ...newPhotos]);
    } else {
      setAfterPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index: number, type: 'before' | 'after') => {
    if (type === 'before') {
      setBeforePhotos(prev => {
        const newPhotos = [...prev];
        URL.revokeObjectURL(newPhotos[index].preview);
        newPhotos.splice(index, 1);
        return newPhotos;
      });
    } else {
      setAfterPhotos(prev => {
        const newPhotos = [...prev];
        URL.revokeObjectURL(newPhotos[index].preview);
        newPhotos.splice(index, 1);
        return newPhotos;
      });
    }
  };

  const updatePhotoDetails = (index: number, type: 'before' | 'after', field: 'description' | 'location', value: string) => {
    if (type === 'before') {
      setBeforePhotos(prev => {
        const newPhotos = [...prev];
        newPhotos[index] = { ...newPhotos[index], [field]: value };
        return newPhotos;
      });
    } else {
      setAfterPhotos(prev => {
        const newPhotos = [...prev];
        newPhotos[index] = { ...newPhotos[index], [field]: value };
        return newPhotos;
      });
    }
  };

  const handleUpload = async () => {
    if (beforePhotos.length === 0 && afterPhotos.length === 0) {
      alert('Please add at least one photo before uploading');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      
      // Add service details
      formData.append('bookingId', bookingId);
      formData.append('clientId', clientId);
      formData.append('serviceDate', serviceDate);
      formData.append('serviceType', serviceType);
      formData.append('teamMember', teamMember);
      formData.append('location', location);
      formData.append('teamReport', teamReport);
      formData.append('duration', duration.toString());
      formData.append('notes', notes);
      
      if (customerSatisfaction) {
        formData.append('customerSatisfaction', customerSatisfaction.toString());
      }

      // Add before photos
      beforePhotos.forEach((photo, index) => {
        formData.append(`beforePhoto_${index}`, photo.file);
        formData.append(`beforeDescription_${index}`, photo.description);
        formData.append(`beforeLocation_${index}`, photo.location);
      });

      // Add after photos
      afterPhotos.forEach((photo, index) => {
        formData.append(`afterPhoto_${index}`, photo.file);
        formData.append(`afterDescription_${index}`, photo.description);
        formData.append(`afterLocation_${index}`, photo.location);
      });

      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setUploadResult(result);
        if (onUploadComplete) {
          onUploadComplete(result);
        }
        
        // Clear form
        setBeforePhotos([]);
        setAfterPhotos([]);
        setTeamReport('');
        setNotes('');
        setCustomerSatisfaction(undefined);
      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      console.error('❌ Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (uploadResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Photos Uploaded Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              {uploadResult.uploadedPhotos} photos uploaded to client folder
            </p>
            <button
              onClick={() => setUploadResult(null)}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Upload More Photos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 rounded-t-xl">
          <h1 className="text-xl font-bold">Service Photo Upload</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Upload before & after photos for {clientProfile?.customerName}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Service Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">
              <p><span className="font-semibold">Service:</span> {serviceType}</p>
              <p><span className="font-semibold">Date:</span> {serviceDate}</p>
              <p><span className="font-semibold">Team:</span> {teamMember}</p>
              <p><span className="font-semibold">Location:</span> {location}</p>
            </div>
          </div>

          {/* Before Photos Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Before Photos</h3>
              <button
                onClick={() => beforeFileInputRef.current?.click()}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Camera className="h-4 w-4" />
                Add Photos
              </button>
            </div>
            
            <input
              ref={beforeFileInputRef}
              type="file"
              multiple
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handlePhotoSelect(e.target.files, 'before')}
            />

            <div className="grid grid-cols-2 gap-3">
              {beforePhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo.preview}
                    alt="Before"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index, 'before')}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={photo.description}
                    onChange={(e) => updatePhotoDetails(index, 'before', 'description', e.target.value)}
                    className="mt-2 w-full text-xs p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* After Photos Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">After Photos</h3>
              <button
                onClick={() => afterFileInputRef.current?.click()}
                className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <Camera className="h-4 w-4" />
                Add Photos
              </button>
            </div>
            
            <input
              ref={afterFileInputRef}
              type="file"
              multiple
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handlePhotoSelect(e.target.files, 'after')}
            />

            <div className="grid grid-cols-2 gap-3">
              {afterPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo.preview}
                    alt="After"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index, 'after')}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={photo.description}
                    onChange={(e) => updatePhotoDetails(index, 'after', 'description', e.target.value)}
                    className="mt-2 w-full text-xs p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 120)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                min="30"
                max="480"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Satisfaction (1-5 stars)
              </label>
              <select
                value={customerSatisfaction || ''}
                onChange={(e) => setCustomerSatisfaction(e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Not provided yet</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Good</option>
                <option value="3">⭐⭐⭐ Average</option>
                <option value="2">⭐⭐ Poor</option>
                <option value="1">⭐ Very Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Report
              </label>
              <textarea
                value={teamReport}
                onChange={(e) => setTeamReport(e.target.value)}
                placeholder="Brief report on service completion, any issues, or notes..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes or observations..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={3}
              />
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={isUploading || (beforePhotos.length === 0 && afterPhotos.length === 0)}
            className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Uploading Photos...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Upload {beforePhotos.length + afterPhotos.length} Photos
              </>
            )}
          </button>

          {/* Photo Summary */}
          {(beforePhotos.length > 0 || afterPhotos.length > 0) && (
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-800 mb-2">Photo Summary:</h4>
              <div className="text-sm text-emerald-700">
                <p>📷 Before Photos: {beforePhotos.length}</p>
                <p>📷 After Photos: {afterPhotos.length}</p>
                <p>📊 Total: {beforePhotos.length + afterPhotos.length} photos</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}