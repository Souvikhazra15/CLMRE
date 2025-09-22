import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { CheckCircle, XCircle, Clock, Building, Mail, FileText, Shield } from 'lucide-react';
import { CompanyApplication } from '../../types';

const mockApplications: CompanyApplication[] = [
  {
    id: '1',
    companyName: 'BioCorp Pharmaceuticals',
    contactEmail: 'research@biocorp.com',
    purpose: 'Marine biotechnology research for drug discovery from coral species',
    status: 'pending',
    submissionDate: '2024-01-15'
  },
  {
    id: '2',
    companyName: 'AquaTech Solutions',
    contactEmail: 'admin@aquatech.in',
    purpose: 'Environmental monitoring and conservation technology development',
    status: 'approved',
    submissionDate: '2024-01-10',
    reviewDate: '2024-01-12'
  },
  {
    id: '3',
    companyName: 'OceanData Analytics',
    contactEmail: 'contact@oceandata.com',
    purpose: 'Commercial fisheries optimization and predictive modeling',
    status: 'rejected',
    submissionDate: '2024-01-08',
    reviewDate: '2024-01-11'
  },
  {
    id: '4',
    companyName: 'Marine Genomics Ltd',
    contactEmail: 'info@marinegenomics.org',
    purpose: 'eDNA analysis for biodiversity assessment and species monitoring',
    status: 'pending',
    submissionDate: '2024-01-14'
  }
];

export function CompanyVerification() {
  const [applications, setApplications] = useState<CompanyApplication[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<CompanyApplication | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');

  const handleReview = (application: CompanyApplication, status: 'approved' | 'rejected') => {
    setApplications(prev =>
      prev.map(app =>
        app.id === application.id
          ? {
              ...app,
              status,
              reviewDate: new Date().toISOString().split('T')[0]
            }
          : app
      )
    );
    setShowModal(false);
    setSelectedApplication(null);
    setReviewNotes('');
  };

  const getStatusIcon = (status: CompanyApplication['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: CompanyApplication['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-600/20 text-green-300 border-green-600/30';
      case 'rejected':
        return 'bg-red-600/20 text-red-300 border-red-600/30';
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-300 border-yellow-600/30';
    }
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const approvedCount = applications.filter(app => app.status === 'approved').length;
  const rejectedCount = applications.filter(app => app.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-400">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-red-400">{rejectedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Applications</p>
                <p className="text-2xl font-bold text-white">{applications.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Company Access Applications</h3>
          <p className="text-slate-400">
            Review and approve company requests for marine data access
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Building className="h-5 w-5 text-blue-400" />
                      <h4 className="font-medium text-white">{application.companyName}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(application.status)}`}
                      >
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{application.contactEmail}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <FileText className="h-4 w-4 mt-0.5" />
                        <span>{application.purpose}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>Submitted: {application.submissionDate}</span>
                        {application.reviewDate && (
                          <span>Reviewed: {application.reviewDate}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(application.status)}
                    {application.status === 'pending' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowModal(true);
                        }}
                      >
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Review Application"
        className="max-w-2xl"
      >
        {selectedApplication && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Company Details</h4>
                <div className="bg-slate-900/50 p-4 rounded-lg space-y-2 text-sm">
                  <div><span className="text-slate-400">Name:</span> <span className="text-white">{selectedApplication.companyName}</span></div>
                  <div><span className="text-slate-400">Email:</span> <span className="text-white">{selectedApplication.contactEmail}</span></div>
                  <div><span className="text-slate-400">Submitted:</span> <span className="text-white">{selectedApplication.submissionDate}</span></div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">Purpose of Access</h4>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <p className="text-slate-300">{selectedApplication.purpose}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Review Notes (Optional)
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="w-full h-24 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add any notes about your decision..."
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="primary"
                onClick={() => handleReview(selectedApplication, 'approved')}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Access
              </Button>
              <Button
                variant="outline"
                onClick={() => handleReview(selectedApplication, 'rejected')}
                className="flex-1 border-red-600 text-red-400 hover:bg-red-600/10"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Application
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}