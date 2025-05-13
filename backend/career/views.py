from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import (
    Subject, Program, University, CareerPath, Recommendation,
    CareerQuiz, QuizQuestion, QuizOption, QuizResult
)
from .serializers import (
    SubjectSerializer, UniversitySerializer, ProgramListSerializer,
    ProgramDetailSerializer, CareerPathListSerializer, CareerPathDetailSerializer,
    RecommendationSerializer, CareerQuizListSerializer, CareerQuizDetailSerializer,
    QuizSubmissionSerializer, QuizResultSerializer
)
from utils.permissions import IsStudent


class SubjectListView(generics.ListAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Subject.objects.all()
        level = self.request.query_params.get('level')
        if level:
            queryset = queryset.filter(level=level)
        return queryset


class SubjectDetailView(generics.RetrieveAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class UniversityListView(generics.ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = University.objects.all()
        country = self.request.query_params.get('country')
        if country:
            queryset = queryset.filter(country=country)
        return queryset


class UniversityDetailView(generics.RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [permissions.IsAuthenticated]


class ProgramListView(generics.ListAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Program.objects.all()
        university_id = self.request.query_params.get('university')
        degree_type = self.request.query_params.get('degree_type')
        
        if university_id:
            queryset = queryset.filter(university_id=university_id)
        if degree_type:
            queryset = queryset.filter(degree_type=degree_type)
        
        return queryset


class ProgramDetailView(generics.RetrieveAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramDetailSerializer
    permission_classes = [permissions.IsAuthenticated]


class CareerPathListView(generics.ListAPIView):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = CareerPath.objects.all()
        sector = self.request.query_params.get('sector')
        program_id = self.request.query_params.get('program')
        
        if sector:
            queryset = queryset.filter(sector=sector)
        if program_id:
            queryset = queryset.filter(related_programs__id=program_id)
        
        return queryset


class CareerPathDetailView(generics.RetrieveAPIView):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathDetailSerializer
    permission_classes = [permissions.IsAuthenticated]


class RecommendationListView(generics.ListAPIView):
    serializer_class = RecommendationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Recommendation.objects.filter(user=self.request.user)


class RecommendationDetailView(generics.RetrieveAPIView):
    serializer_class = RecommendationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Recommendation.objects.filter(user=self.request.user)


class CareerQuizListView(generics.ListAPIView):
    queryset = CareerQuiz.objects.all()
    serializer_class = CareerQuizListSerializer
    permission_classes = [permissions.IsAuthenticated]


class CareerQuizDetailView(generics.RetrieveAPIView):
    queryset = CareerQuiz.objects.all()
    serializer_class = CareerQuizDetailSerializer
    permission_classes = [permissions.IsAuthenticated]


class SubmitQuizView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, pk):
        quiz = get_object_or_404(CareerQuiz, pk=pk)
        serializer = QuizSubmissionSerializer(data=request.data)
        
        if serializer.is_valid():
            answers = serializer.validated_data['answers']
            
            # Process quiz answers to calculate traits and scores
            # This is a simplified implementation
            traits = {
                'analytical': 0,
                'creative': 0,
                'social': 0,
                'practical': 0,
                'leadership': 0
            }
            
            # Process each answer and map to traits
            for question_id, option_id in answers.items():
                try:
                    option = QuizOption.objects.get(id=option_id)
                    option_traits = option.career_traits.split(',')
                    
                    for trait in option_traits:
                        trait = trait.strip().lower()
                        if trait in traits:
                            traits[trait] += 1
                except QuizOption.DoesNotExist:
                    pass
            
            # Create or update quiz result
            result, created = QuizResult.objects.update_or_create(
                user=request.user,
                quiz=quiz,
                defaults={
                    'answers': answers,
                    'score': traits
                }
            )
            
            # Generate career recommendations based on quiz results
            # Find careers that match the top traits
            dominant_traits = sorted(traits.items(), key=lambda x: x[1], reverse=True)[:2]
            dominant_trait_names = [t[0] for t in dominant_traits]
            
            # This would be a more sophisticated algorithm in production
            # For now, we'll create some basic recommendations
            for career in CareerPath.objects.all()[:5]:  # Limit to 5 for demo
                # In production, this would use a proper matching algorithm
                # Here we're just creating sample recommendations
                score = float(50 + (traits.get('analytical', 0) * 5))  # Sample score calculation
                Recommendation.objects.update_or_create(
                    user=request.user,
                    career_path=career,
                    defaults={
                        'score': min(score, 100.0),  # Cap at 100%
                        'reasoning': f"Based on your quiz results, you have strong {', '.join(dominant_trait_names)} traits which align well with this career."
                    }
                )
            
            return Response(QuizResultSerializer(result).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuizResultListView(generics.ListAPIView):
    serializer_class = QuizResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return QuizResult.objects.filter(user=self.request.user)


class QuizResultDetailView(generics.RetrieveAPIView):
    serializer_class = QuizResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return QuizResult.objects.filter(user=self.request.user)


class GetOLevelRecommendationsView(APIView):
    permission_classes = [IsStudent]
    
    def post(self, request):
        subject_ids = request.data.get('subjects', [])
        
        if not subject_ids:
            return Response({'error': 'Please provide subject IDs'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Get O Level subjects
            o_level_subjects = Subject.objects.filter(id__in=subject_ids, level='O_LEVEL')
            
            if not o_level_subjects:
                return Response({'error': 'No valid O Level subjects found'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Logic to recommend A Level subjects based on O Level subjects
            # This would be a more sophisticated algorithm in production
            # For now, we'll just return all A Level subjects
            a_level_subjects = Subject.objects.filter(level='A_LEVEL')[:10]  # Limit to 10 for demo
            
            return Response({
                'a_level_subjects': SubjectSerializer(a_level_subjects, many=True).data,
                'message': 'Based on your O Level subjects, these A Level subjects are recommended'
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetALevelRecommendationsView(APIView):
    permission_classes = [IsStudent]
    
    def post(self, request):
        subject_ids = request.data.get('subjects', [])
        
        if not subject_ids:
            return Response({'error': 'Please provide subject IDs'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Get A Level subjects
            a_level_subjects = Subject.objects.filter(id__in=subject_ids, level='A_LEVEL')
            
            if not a_level_subjects:
                return Response({'error': 'No valid A Level subjects found'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Logic to recommend programs based on A Level subjects
            # Find programs that match the subjects
            # This would be a more sophisticated algorithm in production
            recommended_programs = Program.objects.filter(subjects_required__in=a_level_subjects).distinct()[:10]
            
            return Response({
                'programs': ProgramListSerializer(recommended_programs, many=True).data,
                'message': 'Based on your A Level subjects, these programs are recommended'
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetProgramRecommendationsView(APIView):
    permission_classes = [IsStudent]
    
    def post(self, request):
        program_ids = request.data.get('programs', [])
        
        if not program_ids:
            return Response({'error': 'Please provide program IDs'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Get programs
            programs = Program.objects.filter(id__in=program_ids)
            
            if not programs:
                return Response({'error': 'No valid programs found'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Logic to recommend careers based on programs
            # Find careers that are linked to the programs
            # This would be a more sophisticated algorithm in production
            recommended_careers = CareerPath.objects.filter(related_programs__in=programs).distinct()[:10]
            
            return Response({
                'careers': CareerPathListSerializer(recommended_careers, many=True).data,
                'message': 'Based on your selected programs, these careers are recommended'
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetCareerRecommendationsView(APIView):
    permission_classes = [IsStudent]
    
    def get(self, request):
        try:
            # Get user's quiz results
            quiz_results = QuizResult.objects.filter(user=request.user).order_by('-completed_at').first()
            
            if not quiz_results:
                return Response({
                    'message': 'No quiz results found. Please complete a career quiz first.',
                    'recommendations': []
                })
            
            # Get user's recommendations
            recommendations = Recommendation.objects.filter(user=request.user).order_by('-score')
            
            return Response({
                'message': 'Career recommendations based on your profile and quiz results',
                'recommendations': RecommendationSerializer(recommendations, many=True).data
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
