import React, { useState, useEffect } from 'react';
import { MenuItem } from '../../types';
import menuData from '../../data/menuData';
import './MenuManagement.css';

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    image: '',
    category: '',
  });

  useEffect(() => {
    // 실제 API 호출로 대체해야 함
    setMenuItems(menuData);
  }, []);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleSave = (updatedItem: MenuItem) => {
    // 실제 API 호출로 대체해야 함
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const handleDelete = (id: number) => {
    // 실제 API 호출로 대체해야 함
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    // 실제 API 호출로 대체해야 함
    const newId = Math.max(...menuItems.map((item) => item.id)) + 1;
    const itemToAdd: MenuItem = {
      id: newId,
      name: newItem.name || '',
      price: newItem.price || 0,
      image: newItem.image || '',
      category: newItem.category || '',
    };
    setMenuItems((prev) => [...prev, itemToAdd]);
    setNewItem({
      name: '',
      price: 0,
      image: '',
      category: '',
    });
  };

  return (
    <div className="menu-management">
      <h1>메뉴 관리</h1>
      
      <div className="add-menu-form">
        <h2>새 메뉴 추가</h2>
        <div className="form-group">
          <label htmlFor="name">메뉴명</label>
          <input
            type="text"
            id="name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">가격</label>
          <input
            type="number"
            id="price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">이미지 URL</label>
          <input
            type="text"
            id="image"
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">카테고리</label>
          <input
            type="text"
            id="category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
        </div>
        <button onClick={handleAdd} className="add-button">
          메뉴 추가
        </button>
      </div>
      
      <div className="menu-list">
        <h2>메뉴 목록</h2>
        <table className="menu-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>이미지</th>
              <th>메뉴명</th>
              <th>가격</th>
              <th>카테고리</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img src={item.image} alt={item.name} className="menu-thumbnail" />
                </td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}원</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => handleEdit(item)} className="edit-button">
                    수정
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="delete-button">
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {editingItem && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>메뉴 수정</h2>
            <div className="form-group">
              <label htmlFor="edit-name">메뉴명</label>
              <input
                type="text"
                id="edit-name"
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-price">가격</label>
              <input
                type="number"
                id="edit-price"
                value={editingItem.price}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, price: Number(e.target.value) })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-image">이미지 URL</label>
              <input
                type="text"
                id="edit-image"
                value={editingItem.image}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, image: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-category">카테고리</label>
              <input
                type="text"
                id="edit-category"
                value={editingItem.category}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, category: e.target.value })
                }
              />
            </div>
            <div className="modal-buttons">
              <button onClick={() => handleSave(editingItem)} className="save-button">
                저장
              </button>
              <button onClick={() => setEditingItem(null)} className="cancel-button">
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement; 