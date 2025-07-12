'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdminAuth } from '../../../hooks/useAdminAuth';
import { 
  FaArrowLeft, 
  FaUser, 
  FaEnvelope, 
  FaTag, 
  FaCalendarAlt, 
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
  FaReply,
  FaArchive
} from 'react-icons/fa';

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  new: { label: 'Nouveau', color: 'bg-blue-500', icon: FaExclamationCircle },
  read: { label: 'Lu', color: 'bg-yellow-500', icon: FaCheckCircle },
  replied: { label: 'Répondu', color: 'bg-green-500', icon: FaReply },
  archived: { label: 'Archivé', color: 'bg-gray-500', icon: FaArchive }
};

export default function ContactDetailPage() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const params = useParams();
  const contactId = params?.id as string;

  const [contact, setContact] = useState<ContactQuery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  const updateStatus = useCallback(async (newStatus: ContactQuery['status']) => {
    if (!contact) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setContact({ ...contact, status: newStatus });
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      setError('Erreur lors de la mise à jour du statut');
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  }, [contact]);

  const fetchContact = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`);
      
      if (!response.ok) {
        throw new Error('Contact non trouvé');
      }

      const data = await response.json();
      setContact(data.contact);
      
      // Marquer comme lu si c'est nouveau
      if (data.contact.status === 'new') {
        await updateStatus('read');
      }
    } catch (error) {
      setError('Erreur lors du chargement du contact');
      console.error('Error fetching contact:', error);
    } finally {
      setLoading(false);
    }
  }, [contactId, updateStatus]);

  useEffect(() => {
    if (isAuthenticated && contactId) {
      fetchContact();
    }
  }, [isAuthenticated, contactId, fetchContact]);

  const deleteContact = async () => {
    if (!contact) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      try {
        const response = await fetch(`/api/admin/contacts/${contact.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          router.push('/admin');
        } else {
          throw new Error('Erreur lors de la suppression');
        }
      } catch (error) {
        setError('Erreur lors de la suppression');
        console.error('Error deleting contact:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error || !contact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
            >
              <FaArrowLeft /> Retour au dashboard
            </button>
            
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center">
              <p className="text-red-300 text-lg">{error || 'Contact non trouvé'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[contact.status].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <FaArrowLeft /> Retour au dashboard
            </button>
            
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-white text-sm flex items-center gap-2 ${statusConfig[contact.status].color}`}>
                <StatusIcon className="text-xs" />
                {statusConfig[contact.status].label}
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-black/40 backdrop-blur-xl border border-yellow-400/20 rounded-2xl p-8 shadow-2xl">
            {/* Header Info */}
            <div className="border-b border-gray-700 pb-6 mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Détails du contact</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <FaUser className="text-yellow-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Nom</p>
                    <p className="text-white text-lg font-semibold">{contact.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-yellow-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-white text-lg font-semibold hover:text-yellow-400 transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaTag className="text-yellow-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Sujet</p>
                    <p className="text-white text-lg font-semibold">{contact.subject}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-yellow-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Date de réception</p>
                    <p className="text-white text-lg font-semibold">{formatDate(contact.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Message</h2>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => updateStatus('read')}
                  disabled={updating || contact.status === 'read'}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaCheckCircle />
                  Marquer comme lu
                </button>
                
                <button
                  onClick={() => updateStatus('replied')}
                  disabled={updating || contact.status === 'replied'}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaReply />
                  Marquer comme répondu
                </button>
                
                <button
                  onClick={() => updateStatus('archived')}
                  disabled={updating || contact.status === 'archived'}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaArchive />
                  Archiver
                </button>
              </div>
              
              <button
                onClick={deleteContact}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <FaTrash />
                Supprimer
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Dernière mise à jour : {formatDate(contact.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 