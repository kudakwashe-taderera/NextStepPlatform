from rest_framework import permissions


class IsLecturer(permissions.BasePermission):
    """
    Custom permission to only allow lecturers to access a view.
    """
    message = "Only lecturers can perform this action."
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'LECTURER'


class IsStudent(permissions.BasePermission):
    """
    Custom permission to only allow students (O Level, A Level, Tertiary) to access a view.
    """
    message = "Only students can perform this action."
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        student_roles = ['O_LEVEL', 'A_LEVEL', 'TERTIARY']
        return request.user.role in student_roles


class IsMentor(permissions.BasePermission):
    """
    Custom permission to only allow mentors to access a view.
    """
    message = "Only mentors can perform this action."
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'MENTOR'


class IsEmployer(permissions.BasePermission):
    """
    Custom permission to only allow employers to access a view.
    """
    message = "Only employers can perform this action."
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'EMPLOYER'


class IsInstitutionAdmin(permissions.BasePermission):
    """
    Custom permission to only allow institution admins to access a view.
    """
    message = "Only institution administrators can perform this action."
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'INST_ADMIN'


class IsMinistryAdmin(permissions.BasePermission):
    """
    Custom permission to only allow ministry admins to access a view.
    """
    message = "Only ministry administrators can perform this action."
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'MIN_ADMIN'


class IsSuperuser(permissions.BasePermission):
    """
    Custom permission to only allow superusers to access a view.
    """
    message = "Only superusers can perform this action."
    
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'SUPERUSER'


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    message = "You must be the owner of this object to perform this action."
    
    def has_object_permission(self, request, view, obj):
        # Assume the model instance has either a 'user', 'owner', 'created_by',
        # or some other attribute that represents the owner
        
        # Check common owner field names
        if hasattr(obj, 'user'):
            return obj.user == request.user
        
        if hasattr(obj, 'owner'):
            return obj.owner == request.user
        
        if hasattr(obj, 'created_by'):
            return obj.created_by == request.user
        
        if hasattr(obj, 'posted_by'):
            return obj.posted_by == request.user
        
        if hasattr(obj, 'instructor'):
            return obj.instructor == request.user
        
        if hasattr(obj, 'sender'):
            return obj.sender == request.user
        
        # If no owner field is found, deny permission
        return False


class IsInstitutionOrMinistryAdmin(permissions.BasePermission):
    """
    Custom permission to allow both institution and ministry admins.
    """
    message = "Only institution or ministry administrators can perform this action."
    
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        admin_roles = ['INST_ADMIN', 'MIN_ADMIN', 'SUPERUSER']
        return request.user.role in admin_roles
