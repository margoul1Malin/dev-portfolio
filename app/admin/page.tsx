'use client';

import { useAdminAuth } from '../hooks/useAdminAuth';
import { useEffect, useState, useCallback } from 'react';

import { useRouter } from 'next/navigation';
import { 
  FaEnvelope, 
  FaEye,
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
  FaReply,
  FaArchive,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight
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

interface ContactStats {
  new: number;
  read: number;
  replied: number;
  archived: number;
  total: number;
}

type ContactStatus = 'new' | 'read' | 'replied' | 'archived';

const statusConfig = {
  new: { label: 'Nouveau', color: 'bg-blue-500', icon: FaExclamationCircle },
  read: { label: 'Lu', color: 'bg-yellow-500', icon: FaCheckCircle },
  replied: { label: 'Répondu', color: 'bg-green-500', icon: FaReply },
  archived: { label: 'Archivé', color: 'bg-gray-500', icon: FaArchive }
};

export default function AdminPage() {
  const { isAuthenticated, isLoading, user, logout, authChecked } = useAdminAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactQuery[]>([]);
  const [stats, setStats] = useState<ContactStats>({
    new: 0,
    read: 0,
    replied: 0,
    archived: 0,
    total: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const loadContacts = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        status: statusFilter === 'all' ? '' : statusFilter,
        search: searchQuery
      });

      const response = await fetch(`/api/admin/contacts?${params}`);
      const data = await response.json();

      if (data.success) {
        setContacts(data.contacts);
        setStats(data.stats);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, searchQuery]);

  useEffect(() => {
    if (!authChecked) return;
    
    if (!isAuthenticated) {
      return;
    }

    loadContacts();
  }, [authChecked, isAuthenticated, loadContacts]);

  const updateContactStatus = async (id: string, newStatus: ContactStatus) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        loadContacts();
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const deleteContact = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      try {
        const response = await fetch(`/api/admin/contacts/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          loadContacts();
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleLogout = async () => {
    logout();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (isLoading || !authChecked) {
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <p>Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-yellow-400/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-400">Panel Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Bienvenue, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Nouveau</p>
                <p className="text-2xl font-bold text-white">{stats.new}</p>
              </div>
              <FaExclamationCircle className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm font-medium">Lu</p>
                <p className="text-2xl font-bold text-white">{stats.read}</p>
              </div>
              <FaCheckCircle className="text-yellow-500 text-2xl" />
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Répondu</p>
                <p className="text-2xl font-bold text-white">{stats.replied}</p>
              </div>
              <FaReply className="text-green-500 text-2xl" />
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-gray-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Archivé</p>
                <p className="text-2xl font-bold text-white">{stats.archived}</p>
              </div>
              <FaArchive className="text-gray-500 text-2xl" />
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-yellow-400/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <FaEnvelope className="text-yellow-400 text-2xl" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-black/40 backdrop-blur-xl border border-yellow-400/20 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaFilter className="text-yellow-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ContactStatus | 'all')}
                  className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="new">Nouveau</option>
                  <option value="read">Lu</option>
                  <option value="replied">Répondu</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaSearch className="text-yellow-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-black/40 backdrop-blur-xl border border-yellow-400/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-400/10">
                <tr>
                  <th className="text-left p-4 text-yellow-400 font-semibold">Contact</th>
                  <th className="text-left p-4 text-yellow-400 font-semibold">Sujet</th>
                  <th className="text-left p-4 text-yellow-400 font-semibold">Date</th>
                  <th className="text-left p-4 text-yellow-400 font-semibold">Statut</th>
                  <th className="text-left p-4 text-yellow-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => {
                  const StatusIcon = statusConfig[contact.status].icon;
                  return (
                    <tr key={contact.id} className="border-b border-gray-700 hover:bg-yellow-400/5">
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{contact.name}</p>
                          <p className="text-gray-400 text-sm">{contact.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-white">{truncateText(contact.subject, 50)}</p>
                        <p className="text-gray-400 text-sm">{truncateText(contact.message, 80)}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-300 text-sm">{formatDate(contact.createdAt)}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${statusConfig[contact.status].color}`}>
                          <StatusIcon />
                          {statusConfig[contact.status].label}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/admin/contacts/${contact.id}`)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                            title="Voir les détails"
                          >
                            <FaEye />
                          </button>
                          
                          <select
                            value={contact.status}
                            onChange={(e) => updateContactStatus(contact.id, e.target.value as ContactStatus)}
                            className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:border-yellow-400"
                          >
                            <option value="new">Nouveau</option>
                            <option value="read">Lu</option>
                            <option value="replied">Répondu</option>
                            <option value="archived">Archivé</option>
                          </select>
                          
                          <button
                            onClick={() => deleteContact(contact.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                Page {currentPage} sur {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-yellow-400 hover:text-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-yellow-400 hover:text-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement des contacts...</p>
          </div>
        )}

        {!loading && contacts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">Aucun contact trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
} 