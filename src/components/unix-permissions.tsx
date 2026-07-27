import React, { useState } from 'react';
import CalculationContainer from './container';

type Permission = 'read' | 'write' | 'execute';
type Entity = 'owner' | 'group' | 'public';

type PermissionsState = {
  [K in Entity]: {
    [P in Permission]: boolean;
  };
};

const defaultPermissions: PermissionsState = {
  owner: { read: true, write: true, execute: false },
  group: { read: true, write: false, execute: false },
  public: { read: true, write: false, execute: false },
};

const permissionValues: Record<Permission, number> = {
  read: 4,
  write: 2,
  execute: 1,
};

const UnixPermissions = () => {
  const [permissions, setPermissions] = useState<PermissionsState>(defaultPermissions);
  const [octalValue, setOctalValue] = useState<string>('644');

  const calculateOctal = (perms: PermissionsState): string => {
    return ['owner', 'group', 'public'].map((entityStr) => {
      const entity = entityStr as Entity;
      let val = 0;
      if (perms[entity].read) val += permissionValues.read;
      if (perms[entity].write) val += permissionValues.write;
      if (perms[entity].execute) val += permissionValues.execute;
      return val.toString();
    }).join('');
  };

  const getSymbolic = (perms: PermissionsState): string => {
    return ['owner', 'group', 'public'].map((entityStr) => {
      const entity = entityStr as Entity;
      let sym = '';
      sym += perms[entity].read ? 'r' : '-';
      sym += perms[entity].write ? 'w' : '-';
      sym += perms[entity].execute ? 'x' : '-';
      return sym;
    }).join('');
  };

  const handleCheckboxChange = (entity: Entity, permission: Permission) => {
    const newPermissions = {
      ...permissions,
      [entity]: {
        ...permissions[entity],
        [permission]: !permissions[entity][permission],
      },
    };
    setPermissions(newPermissions);
    setOctalValue(calculateOctal(newPermissions));
  };

  const handleOctalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-7]/g, '').slice(0, 3);
    setOctalValue(val);

    if (val.length === 3) {
      const newPermissions = { ...permissions };
      ['owner', 'group', 'public'].forEach((entityStr, index) => {
        const entity = entityStr as Entity;
        const num = parseInt(val[index], 10);
        newPermissions[entity] = {
          read: (num & 4) !== 0,
          write: (num & 2) !== 0,
          execute: (num & 1) !== 0,
        };
      });
      setPermissions(newPermissions);
    }
  };

  return (
    <CalculationContainer>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h4 style={{ textAlign: "center", marginBottom: 0 }}>Unix Permissions Calculator</h4>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['owner', 'group', 'public'].map((entityStr) => {
             const entity = entityStr as Entity;
             return (
               <div key={entity} style={{ flex: 1, minWidth: '100px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <strong>{entity.charAt(0).toUpperCase() + entity.slice(1)}</strong>
                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                   <input
                     type="checkbox"
                     checked={permissions[entity].read}
                     onChange={() => handleCheckboxChange(entity, 'read')}
                     aria-label={`${entity} read`}
                   />
                   Read (4)
                 </label>
                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                   <input
                     type="checkbox"
                     checked={permissions[entity].write}
                     onChange={() => handleCheckboxChange(entity, 'write')}
                     aria-label={`${entity} write`}
                   />
                   Write (2)
                 </label>
                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                   <input
                     type="checkbox"
                     checked={permissions[entity].execute}
                     onChange={() => handleCheckboxChange(entity, 'execute')}
                     aria-label={`${entity} execute`}
                   />
                   Execute (1)
                 </label>
               </div>
             );
          })}
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <label style={{ flex: 1, minWidth: '120px' }}>
            Octal
            <input
              type="text"
              value={octalValue}
              onChange={handleOctalChange}
              placeholder="644"
              style={{ marginBottom: 0 }}
            />
          </label>
          <label style={{ flex: 1, minWidth: '120px' }}>
            Symbolic
            <input
              type="text"
              value={getSymbolic(permissions)}
              readOnly
              style={{ marginBottom: 0, cursor: 'not-allowed' }}
            />
          </label>
        </div>
      </div>
    </CalculationContainer>
  );
};

export default UnixPermissions;