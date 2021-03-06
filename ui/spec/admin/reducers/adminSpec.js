import reducer from 'src/admin/reducers/admin'

import {
  addUser,
  addRole,
  syncUser,
  syncRole,
  editUser,
  editRole,
  loadRoles,
  loadPermissions,
  deleteRole,
  deleteUser,
  filterRoles,
  filterUsers,
} from 'src/admin/actions'

let state = undefined

// Users
const u1 = {
  name: 'acidburn',
  roles: [
    {
      name: 'hax0r',
      permissions: {
        allowed: [
          'ViewAdmin',
          'ViewChronograf',
          'CreateDatabase',
          'CreateUserAndRole',
          'AddRemoveNode',
          'DropDatabase',
          'DropData',
          'ReadData',
          'WriteData',
          'Rebalance',
          'ManageShard',
          'ManageContinuousQuery',
          'ManageQuery',
          'ManageSubscription',
          'Monitor',
          'CopyShard',
          'KapacitorAPI',
          'KapacitorConfigAPI'
        ],
        scope: 'all',
      },
    }
  ],
  permissions: [],
  links: {self: '/chronograf/v1/sources/1/users/acidburn'},
}
const u2 = {
  name: 'zerocool',
  roles: [],
  permissions: [],
  links: {self: '/chronograf/v1/sources/1/users/zerocool'},
}
const users = [u1, u2]
const newDefaultUser = {
  name: '',
  password: '',
  roles: [],
  permissions: [],
  links: {self: ''},
  isNew: true,
}

// Roles
const r1 = {
  name: 'hax0r',
  users: [],
  permissions: [
    {
      allowed: [
        'ViewAdmin',
        'ViewChronograf',
        'CreateDatabase',
        'CreateUserAndRole',
        'AddRemoveNode',
        'DropDatabase',
        'DropData',
        'ReadData',
        'WriteData',
        'Rebalance',
        'ManageShard',
        'ManageContinuousQuery',
        'ManageQuery',
        'ManageSubscription',
        'Monitor',
        'CopyShard',
        'KapacitorAPI',
        'KapacitorConfigAPI'
      ],
      scope: 'all',
    },
  ],
  links: {self: '/chronograf/v1/sources/1/roles/hax0r'}
}
const r2 = {
  name: 'l33tus3r',
  links: {self: '/chronograf/v1/sources/1/roles/l33tus3r'}
}
const roles = [r1, r2]
const newDefaultRole = {
  name: '',
  users: [],
  permissions: [],
  links: {self: ''},
  isNew: true,
}

// Permissions
const global = {scope: 'all', allowed: ['p1', 'p2']}
const scoped = {scope: 'db1', allowed: ['p1', 'p3']}
const permissions = [global, scoped]

describe('Admin.Reducers', () => {
  it('it can add a user', () => {
    state = {
      users: [
        u1,
      ]
    }

    const actual = reducer(state, addUser())
    const expected = {
      users: [
        {...newDefaultUser, isEditing: true},
        u1,
      ],
    }

    expect(actual.users).to.deep.equal(expected.users)
  })

  it('it can sync a stale user', () => {
    const staleUser = {...u1, roles: []}
    state = {users: [u2, staleUser]}

    const actual = reducer(state, syncUser(staleUser, u1))
    const expected = {
      users: [u2, u1],
    }

    expect(actual.users).to.deep.equal(expected.users)
  })

  it('it can edit a user', () => {
    const updates = {name: 'onecool'}
    state = {
      users: [u2, u1],
    }

    const actual = reducer(state, editUser(u2, updates))
    const expected = {
      users: [{...u2, ...updates}, u1]
    }

    expect(actual.users).to.deep.equal(expected.users)
  })

  it('it can add a role', () => {
    state = {
      roles: [
        r1,
      ]
    }

    const actual = reducer(state, addRole())
    const expected = {
      roles: [
        {...newDefaultRole, isEditing: true},
        r1,
      ],
    }

    expect(actual.roles).to.deep.equal(expected.roles)
  })

  it('it can sync a stale role', () => {
    const staleRole = {...r1, permissions: []}
    state = {roles: [r2, staleRole]}

    const actual = reducer(state, syncRole(staleRole, r1))
    const expected = {
      roles: [r2, r1],
    }

    expect(actual.roles).to.deep.equal(expected.roles)
  })

  it('it can edit a role', () => {
    const updates = {name: 'onecool'}
    state = {
      roles: [r2, r1],
    }

    const actual = reducer(state, editRole(r2, updates))
    const expected = {
      roles: [{...r2, ...updates}, r1]
    }

    expect(actual.roles).to.deep.equal(expected.roles)
  })

  it('it can load the roles', () => {
    const actual = reducer(state, loadRoles({roles}))
    const expected = {
      roles,
    }

    expect(actual.roles).to.deep.equal(expected.roles)
  })

  it('it can delete a role', () => {
    state = {
      roles: [
        r1,
      ]
    }

    const actual = reducer(state, deleteRole(r1))
    const expected = {
      roles: [],
    }

    expect(actual.roles).to.deep.equal(expected.roles)
  })

  it('it can delete a user', () => {
    state = {
      users: [
        u1,
      ]
    }

    const actual = reducer(state, deleteUser(u1))
    const expected = {
      users: [],
    }

    expect(actual.users).to.deep.equal(expected.users)
  })

  it('can filter roles w/ "x" text', () => {
    state = {
      roles,
    }

    const text = 'x'

    const actual = reducer(state, filterRoles(text))
    const expected = {
      roles: [
        {...r1, hidden: false},
        {...r2, hidden: true},
      ],
    }

    expect(actual.roles).to.deep.equal(expected.roles)
  })

  it('can filter users w/ "zero" text', () => {
    state = {
      users,
    }

    const text = 'zero'

    const actual = reducer(state, filterUsers(text))
    const expected = {
      users: [
        {...u1, hidden: true},
        {...u2, hidden: false},
      ],
    }

    expect(actual.users).to.deep.equal(expected.users)
  })

  // Permissions
  it('it can load the permissions', () => {
    const actual = reducer(state, loadPermissions({permissions}))
    const expected = {
      permissions,
    }

    expect(actual.permissions).to.deep.equal(expected.permissions)
  })
})
